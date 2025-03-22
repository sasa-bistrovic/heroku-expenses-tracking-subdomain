package com.by.sasa.bistrovic.expense.tracking;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUserId(Long userId);
    
    @Query("SELECT s FROM Subscription s WHERE s.userId = :userId ORDER BY s.id ASC")
    List<Subscription> findAllByUserId(@Param("userId") Long userId);
    
    @Query("SELECT s FROM Subscription s WHERE s.userId = :userId ORDER BY s.id DESC")
    List<Subscription> findLatestSubscriptionByUserId(@Param("userId") Long userId);
}
