package com.by.sasa.bistrovic.expense.tracking;

import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final UsersRepository userRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, UsersRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    public Optional<Subscription> getSubscriptionByUserId(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }
    
    public List<Subscription> getLastSubscription(Long userId) {
        return subscriptionRepository.findLatestSubscriptionByUserId(userId);
    }

public Subscription createSubscription(Long userId, String type, boolean isAnnual, String transactionHash) {
    Subscription subscription = new Subscription();
    subscription.setUserId(userId);
    subscription.setTransactionHash(transactionHash);
    subscription.setConfirmed(false);
    double cost;

    // Calculate cost and set subscription type-specific values
    switch (type) {
        case "Free":
            subscription.setType("Free");
            subscription.setCost(0.00);
            subscription.setMaxTasks(2);
            subscription.setMaxParticipants(4);
            subscription.setMaxExpenses(10);
            subscription.setConfirmed(true);
            subscription.setExpirationDate(calculateExpirationDate(30));
            break;

        case "Professional1":
            cost = isAnnual ? 1.99 * 12 * 0.80 : 1.99;
            subscription.setType("Professional1");
            subscription.setCost(cost);
            subscription.setMaxTasks(4);
            subscription.setMaxParticipants(8);
            subscription.setMaxExpenses(20);
            subscription.setExpirationDate(calculateExpirationDate(isAnnual ? 365 : 30)); // Annual or monthly
            break;

        case "Professional2":
            cost = isAnnual ? 2.99 * 12 * 0.80 : 2.99;
            subscription.setType("Professional2");
            subscription.setCost(cost);
            subscription.setMaxTasks(6);
            subscription.setMaxParticipants(12);
            subscription.setMaxExpenses(40);
            subscription.setExpirationDate(calculateExpirationDate(isAnnual ? 365 : 30)); // Annual or monthly
            break;            

        case "Professional3":
            cost = isAnnual ? 3.99 * 12 * 0.80 : 3.99;
            subscription.setType("Professional3");
            subscription.setCost(cost);
            subscription.setMaxTasks(8);
            subscription.setMaxParticipants(16);
            subscription.setMaxExpenses(60);
            subscription.setExpirationDate(calculateExpirationDate(isAnnual ? 365 : 30)); // Annual or monthly
            break;                        
        
        case "Professional4":
            cost = isAnnual ? 4.99 * 12 * 0.80 : 4.99;
            subscription.setType("Professional4");
            subscription.setCost(cost);
            subscription.setMaxTasks(10);
            subscription.setMaxParticipants(20);
            subscription.setMaxExpenses(80);
            subscription.setExpirationDate(calculateExpirationDate(isAnnual ? 365 : 30)); // Annual or monthly
            break;                            
        
        case "Professional5":
            cost = isAnnual ? 5.99 * 12 * 0.80 : 5.99;
            subscription.setType("Professional5");
            subscription.setCost(cost);
            subscription.setMaxTasks(12);
            subscription.setMaxParticipants(24);
            subscription.setMaxExpenses(100);
            subscription.setExpirationDate(calculateExpirationDate(isAnnual ? 365 : 30)); // Annual or monthly
            break;                                
/*
        case "Enterprise":
            cost = isAnnual ? 49.99 * 12 * 0.80 : 49.99;
            subscription.setType("Enterprise");
            subscription.setCost(cost);
            subscription.setMaxTasks(Integer.MAX_VALUE);
            subscription.setMaxParticipants(Integer.MAX_VALUE);
            subscription.setExpirationDate(calculateExpirationDate(isAnnual ? 365 : 30)); // Annual or monthly
            break;
*/
        default:
            throw new IllegalArgumentException("Unknown subscription type: " + type);
    }

    return subscriptionRepository.save(subscription);
}

// Helper method to calculate expiration date based on duration in days
private Date calculateExpirationDate(int days) {
    Calendar calendar = Calendar.getInstance();
    calendar.add(Calendar.DAY_OF_YEAR, days);
    return calendar.getTime();
}

    public Subscription updateSubscription(Long userId, String type, boolean isAnnual, String transactionHash) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return createSubscription(userId, type, isAnnual, transactionHash);
    }

    public void deleteSubscription(Long subscriptionId) {
        subscriptionRepository.deleteById(subscriptionId);
    }
    
    public boolean updateConfirmationStatus(Long subscriptionId, boolean isConfirmed) {
        Optional<Subscription> subscriptionOpt = subscriptionRepository.findById(subscriptionId);
        if (subscriptionOpt.isPresent()) {
            Subscription subscription = subscriptionOpt.get();
            subscription.setConfirmed(isConfirmed);
            subscriptionRepository.save(subscription);
            return true;
        }
        return false;
    }    
}
