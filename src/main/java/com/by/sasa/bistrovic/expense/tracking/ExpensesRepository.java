package com.by.sasa.bistrovic.expense.tracking;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpensesRepository extends JpaRepository<Expenses, Long> {
    
    @Query("SELECT e FROM Expenses e ORDER BY e.id ASC")
    Optional<Expenses> findByEmailAndOrderById();
    
    @Query("SELECT e FROM Expenses e WHERE e.groupEmail = :groupEmail AND e.groupName = :groupName ORDER BY e.id ASC")
    List<Expenses> findByEmailAndNameAndOrderById(@Param("groupEmail") String groupEmail, @Param("groupName") String groupName);
}
