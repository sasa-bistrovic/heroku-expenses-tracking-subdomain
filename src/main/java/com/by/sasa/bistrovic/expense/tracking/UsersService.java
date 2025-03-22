package com.by.sasa.bistrovic.expense.tracking;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersRepository userRepository;
    
    public Long getUserIdByEmail(String email) {
        return userRepository.findIdByEmail(email);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Users registerUser(Users user) {
        user.setEnabled(false);
        user.setVerificationToken(UUID.randomUUID().toString());
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(24));
        return userRepository.save(user);
    }

    public boolean verifyUser(String token) {
        Optional<Users> user = userRepository.findByVerificationToken(token);
        if (user.isPresent() && user.get().getTokenExpiryDate().isAfter(LocalDateTime.now())) {
            Users verifiedUser = user.get();
            verifiedUser.setEnabled(true);
            verifiedUser.setVerificationToken(null); // clear the token
            verifiedUser.setTokenExpiryDate(null);   // clear the token expiry date
            userRepository.save(verifiedUser);
            return true;
        }
        return false;
    }
    
    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Generate a new verification token
    public void generateNewVerificationToken(Users user) {
        String newToken = UUID.randomUUID().toString();
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(24));
        user.setVerificationToken(newToken);
        userRepository.save(user);
    }

    // Update user's password
    public void updatePassword(Users user, String newPassword) {
        // Implement password encryption logic if needed
        user.setPassword(newPassword);
        user.setEnabled(true);
        user.setPasswordResetToken(null); // clear the token
        user.setTokenExpirationDate(null);   // clear the token expiry date
        userRepository.save(user);
    }

    public void deleteUser(Users user) {
        userRepository.delete(user);
    }    

    public void generateNewPasswordResetToken(Users user) {
        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        user.setTokenExpirationDate(LocalDateTime.now().plusHours(1));
        userRepository.save(user);
    }

    public Optional<Users> findByPasswordResetToken(String token) {
        return userRepository.findByPasswordResetToken(token);
    }    
    
    public Users save(Users user) {
        // Here, you can add additional business logic before saving the user
        return userRepository.save(user);
    }
    
    public List<Users> saveAll(List<Users> user) {
        // Here, you can add additional business logic before saving the user
        return userRepository.saveAll(user);
    }
    
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
    
    public Optional<Users> findById(Long id) {
        return userRepository.findById(id);
    }

}
