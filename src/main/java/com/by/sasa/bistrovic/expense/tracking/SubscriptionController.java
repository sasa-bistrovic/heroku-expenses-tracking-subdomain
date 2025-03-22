package com.by.sasa.bistrovic.expense.tracking;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    
    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UsersRepository userRepository;
    
    @Autowired
    private SubscriptionRepository subscriptionRepository;


    @GetMapping("/subscriptions/{userId}")
    public List<Subscription> getAllSubscriptionByUserId(@PathVariable Long userId) {
        return subscriptionRepository.findAllByUserId(userId);
    }
    
    @GetMapping("/{userId}")
    public Optional<Subscription> getUserSubscription(@PathVariable Long userId) {
        return subscriptionService.getSubscriptionByUserId(userId);
    }

    @PostMapping("/create/{userId}")
    public Subscription createSubscription(@PathVariable Long userId, @RequestParam String type, @RequestParam boolean isAnnual, @RequestParam String transactionHash) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return subscriptionService.createSubscription(userId, type, isAnnual, transactionHash);
    }

    @PutMapping("/update/{userId}")
    public Subscription updateSubscription(@PathVariable Long userId, @RequestParam String type, @RequestParam boolean isAnnual, @RequestParam String transactionHash) {
        return subscriptionService.updateSubscription(userId, type, isAnnual, transactionHash);
    }

    @DeleteMapping("/{subscriptionId}")
    public void deleteSubscription(@PathVariable Long subscriptionId) {
        subscriptionService.deleteSubscription(subscriptionId);
    }
    
    @PutMapping("/{subscriptionId}/confirm")
    public ResponseEntity<String> updateSubscriptionConfirmationStatus(
            @PathVariable Long subscriptionId,
            @RequestParam boolean isConfirmed) {
        boolean updated = subscriptionService.updateConfirmationStatus(subscriptionId, isConfirmed);
        if (updated) {
            return ResponseEntity.ok("Subscription status updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Subscription not found or could not be updated.");
        }
    }
    
    @GetMapping("/last/{userId}")
    public List<Subscription> getLastSubscription(@PathVariable Long userId) {
        return subscriptionService.getLastSubscription(userId);
    }
}
