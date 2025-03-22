package com.by.sasa.bistrovic.expense.tracking;

import io.jsonwebtoken.Claims;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService userService;
    
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private EmailService emailService;
    
    @GetMapping
    public List<Users> getAllGroups() {
        return usersRepository.findAll();
    }
    
    @GetMapping("/user/id")
    public Long getUserId(@RequestParam String email2) {
        return userService.getUserIdByEmail(email2);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
        Users user = userService.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users userDetails) {
        Users user = userService.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.noContent().build();
        }

        user.setEmail(userDetails.getEmail());
        //user.setPassword(userDetails.getPassword());
        
        Users updatedExpense = userService.save(user);
        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        Users user = userService.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.noContent().build();
        }

        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody Users user) {
        if (userService.emailExists(user.getEmail())) {
            return "Email already exists.";
        }

        Users registeredUser = userService.registerUser(user);

        try {
            emailService.sendVerificationEmail(registeredUser.getEmail(), registeredUser.getVerificationToken());
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return "Registered. Check email to verify.";
    }

    @GetMapping("/verify")
    public String verifyUser(@RequestParam("token") String token) {
        boolean isVerified = userService.verifyUser(token);
        return isVerified ? "Email verified successfully." : "Verification failed.";
    }

    @PutMapping("/resend-verification")
    public String resendVerification(@RequestBody Users user) {
        Optional<Users> userOptional = userService.findByEmail(user.getEmail());
        
        if (!userOptional.isPresent()) {
            return "User not found.";
        }

        user = userOptional.get();

        try {
            userService.generateNewVerificationToken(user);
            emailService.sendVerificationEmail(user.getEmail(), user.getVerificationToken());
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
            return "Failed to resend verification email.";
        }

        return "Verification email sent.";
    }

    @PutMapping("/request-password-reset")
    public String requestPasswordReset(@RequestBody Users user) {
    Optional<Users> userOptional = userService.findByEmail(user.getEmail());
    if (!userOptional.isPresent()) {
        return "User not found.";
    }

    user = userOptional.get();

    try {
        userService.generateNewPasswordResetToken(user);
        emailService.sendPasswordResetEmail(user.getEmail(), user.getPasswordResetToken());
    } catch (UnsupportedEncodingException ex) {
        Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
        return "Failed to send password reset email.";
    }

    return "Password reset email sent.";
    }

    @PutMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> payload) {
        
        String token = payload.get("token");
        String newPassword = payload.get("newPassword");
    
        Optional<Users> userOptional = userService.findByPasswordResetToken(token);
        if (!userOptional.isPresent()) {
            return "Invalid or expired password reset token.";
        }

        Users user = userOptional.get();
        userService.updatePassword(user, newPassword);
        return "Password has been reset successfully.";
    }

    @DeleteMapping("/delete")
    public String deleteUserByEmail(@RequestBody Users user) {
        Optional<Users> userOptional = userService.findByEmail(user.getEmail());
        if (!userOptional.isPresent()) {
            return "User not found.";
        }

        userService.deleteUser(userOptional.get());
        return "User with email " + user.getEmail() + " has been deleted successfully.";
    }

    public String generateToken(String email) {
        String secretKey = "yourSecretKey"; // Ovo bi trebalo da bude sigurnija vrednost i čuvana u konfiguraciji

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token važi 24 sata
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public Claims decodeToken(String token) {
        String secretKey = "yourSecretKey";

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Optional<Users> userOpt = userService.findByEmail(username);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (user.getPassword().equals(password) && user.isEnabled()==true) {  // Provera lozinke (preporučuje se korišćenje hash funkcije)
                String token = generateToken(user.getEmail());
                return ResponseEntity.ok().header("Authorization", "Bearer " + token).body("Login successful.");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }       

    @GetMapping("/protected")
    public ResponseEntity<?> protectedEndpoint(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Claims claims = decodeToken(token);
                String userEmail = claims.getSubject();
                return ResponseEntity.ok("Welcome, " + userEmail);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not logged in!");
    }

}