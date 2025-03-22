package com.by.sasa.bistrovic.expense.tracking;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsersRepository extends JpaRepository<Users, Long> {
    boolean existsByEmail(String email);
    Optional<Users> findByEmail(String email);
    Optional<Users> findByVerificationToken(String token);
    Optional<Users> findByPasswordResetToken(String token);
    
    @Query("SELECT g FROM Users g WHERE g.email = :email AND g.enabled = :enabled")
    Optional<Users> findByEmailAndEnabled(@Param("email") String email, @Param("enabled") boolean enabled);
    
    @Query("SELECT g.id FROM Users g WHERE g.email = :email")
    Long findIdByEmail(@Param("email") String email);
}

