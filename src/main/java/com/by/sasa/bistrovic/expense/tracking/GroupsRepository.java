package com.by.sasa.bistrovic.expense.tracking;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface GroupsRepository extends JpaRepository<Groups, Long> {
    Optional<Groups> findByName(String name);
    void deleteByName(String name);
    
    Optional<Groups> findByAccountEmail(String accountEmail);
    void deleteByAccountEmail(String accountEmail);
    
    // Custom query methods
    @Query("DELETE FROM Groups g WHERE g.accountEmail = :accountEmail AND g.name = :name")
    void deleteByAccountEmailAndName(@Param("accountEmail") String accountEmail, @Param("name") String name);
    
    @Query("DELETE FROM Groups g WHERE g.groupEmail = :groupEmail AND g.name = :name")
    void deleteByGroupEmailAndName(@Param("groupEmail") String groupEmail, @Param("name") String name);    

    @Query("SELECT g FROM Groups g WHERE g.accountEmail = :accountEmail AND g.name = :name")
    Optional<Groups> findByAccountEmailAndName(@Param("accountEmail") String accountEmail, @Param("name") String name);

    @Query("SELECT g FROM Groups g WHERE g.groupEmail = :groupEmail AND g.name = :name")
    Optional<Groups> findByGroupEmailAndName(@Param("groupEmail") String groupEmail, @Param("name") String name);
    
    @Query("SELECT g FROM Groups g WHERE g.groupEmail = :groupEmail AND g.name = :name")
    List<Groups> findByGroupEmailAndNameList(@Param("groupEmail") String groupEmail, @Param("name") String name);
    
    @Query("SELECT g FROM Groups g WHERE g.accountEmail = :accountEmail AND g.groupEmail = :groupEmail AND g.name = :name")
    Optional<Groups> findByAccountEmailGroupEmailAndName(@Param("accountEmail") String accountEmail, @Param("groupEmail") String groupEmail, @Param("name") String name);
    
    @Query("SELECT g FROM Groups g WHERE g.accountEmail = :accountEmail AND g.current = :current")
    Optional<Groups> findByAccountEmailAndCurrent(@Param("accountEmail") String accountEmail, @Param("current") boolean current);
    
    @Query("SELECT g FROM Groups g WHERE g.accountEmail = :accountEmail ORDER BY g.id ASC")
    List<Groups> findAllOrderById(@Param("accountEmail") String accountEmail);
    
    @Query("SELECT g FROM Groups g WHERE g.groupEmail = :groupEmail AND g.name = :name")
    List<Groups> findByListGroupEmailAndName(@Param("groupEmail") String groupEmail, @Param("name") String name);
    
}
