package com.by.sasa.bistrovic.expense.tracking;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface TasksRepository extends JpaRepository<Tasks, Long> {
    Optional<Tasks> findByTaskName(String taskName);
    void deleteByTaskName(String taskName);
    
    Optional<Tasks> findByAccountEmail(String accountEmail);
    
    void deleteByAccountEmail(String accountEmail);
    // Custom query methods
    @Query("DELETE FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.taskName = :taskName")
    void deleteByAccountEmailAndName(@Param("accountEmail") String accountEmail, @Param("taskName") String taskName);
    
    @Query("DELETE FROM Tasks t WHERE t.userEmail = :userEmail AND t.taskName = :taskName")
    void deleteByTaskEmailAndName(@Param("userEmail") String userEmail, @Param("taskName") String taskName);    

    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.taskName = :taskName")
    Optional<Tasks> findByAccountEmailAndName(@Param("accountEmail") String accountEmail, @Param("taskName") String taskName);

    @Query("SELECT t FROM Tasks t WHERE t.userEmail = :userEmail AND t.taskName = :taskName")
    Optional<Tasks> findByTaskEmailAndName(@Param("userEmail") String userEmail, @Param("taskName") String taskName);
    
    @Query("SELECT t FROM Tasks t WHERE t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.valueTask = :valueTask")
    List<Tasks> findByTaskEmailAndNameList(@Param("groupEmail") String groupEmail, @Param("taskName") String taskName, @Param("valueTask") boolean valueTask);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.userEmail = :userEmail AND t.taskName = :taskName")
    Optional<Tasks> findByAccountEmailTaskEmailAndName(@Param("accountEmail") String accountEmail, @Param("userEmail") String userEmail, @Param("taskName") String taskName);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.current = :current")
    Optional<Tasks> findByAccountEmailAndCurrent(@Param("accountEmail") String accountEmail, @Param("current") boolean current);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.valueTask = :valueTask AND t.current = :current")
    Optional<Tasks> findByAccountEmailTaskNameAndBoolean(@Param("accountEmail") String accountEmail, @Param("valueTask") boolean valueTask, @Param("current") boolean current);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.userEmail = :userEmail AND t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.valueUserName = :valueUserName")
    Optional<Tasks> findByAccountEmailUserEmailAndBoolean(@Param("accountEmail") String accountEmail, @Param("userEmail") String userEmail, @Param("groupEmail") String groupEmail, @Param("taskName") String taskName, @Param("valueUserName") boolean valueUserName);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.userEmail = :userEmail AND t.taskName = :taskName")
    Optional<Tasks> findByAccountEmailUserEmailAndTaskName(@Param("accountEmail") String accountEmail, @Param("userEmail") String UserEmail, @Param("taskName") String taskName);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.valueTask = :valueTask ORDER BY t.id ASC")
    List<Tasks> findAllOrderByBooleanTaskId(@Param("accountEmail") String accountEmail, @Param("valueTask") boolean valueTask);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.taskName = :taskName AND t.valueUserName = :valueUserName ORDER BY t.id ASC")
    List<Tasks> findAllOrderByBooleanUserNameId(@Param("accountEmail") String accountEmail, @Param("taskName") String taskName, @Param("valueUserName") boolean valueUserName);
    
    @Query("SELECT t FROM Tasks t WHERE t.groupEmail = :groupEmail AND t.taskName = :taskName")
    List<Tasks> findByListTaskEmailAndName(@Param("groupEmail") String groupEmail, @Param("taskName") String taskName);
    
    @Query("SELECT t FROM Tasks t WHERE t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.userEmail = :userEmail")
    List<Tasks> findByListTaskEmailAndNameUser(@Param("groupEmail") String groupEmail, @Param("taskName") String taskName, @Param("userEmail") String userEmail);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.valueUserName = :valueUserName")
    List<Tasks> findByListTaskEmailAndNameUserCopy(@Param("accountEmail") String accountEmail, @Param("groupEmail") String groupEmail, @Param("taskName") String taskNamee, @Param("valueUserName") boolean valueUserName);
    
    @Query("SELECT t FROM Tasks t WHERE t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.valueNumber = :valueNumber AND t.copy = :copy ORDER BY t.userEmail, t.id ASC")
    List<Tasks> findByEmailAndNameAndOrderById(@Param("groupEmail") String groupEmail, @Param("taskName") String taskName, @Param("valueNumber") boolean valueNumber, @Param("copy") boolean copy);
    
    @Query("SELECT t FROM Tasks t WHERE t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.valueNumber = :valueNumber ORDER BY t.userEmail, t.id ASC")
    List<Tasks> findByEmailAndNameAndBooleanAndOrderById(@Param("groupEmail") String groupEmail, @Param("taskName") String taskName, @Param("valueNumber") boolean valueNumber);    
    
    @Query("SELECT t FROM Tasks t WHERE t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.valueTask = :valueTask")
    List<Tasks> findByTaskEmailAndNameListAndBoolean(@Param("groupEmail") String groupEmail, @Param("taskName") String taskName, @Param("valueTask") boolean valueTask);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.taskName = :taskName AND t.valueTask = :valueTask")
    Optional<Tasks> findByTaskEmailAndNameListAndBooleanGroup(@Param("accountEmail") String accountEmail, @Param("taskName") String taskName, @Param("valueTask") boolean valueTask);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.taskName = :taskName AND t.valueTask = :valueTask")
    List<Tasks> findByTaskEmailAndNameListAndBooleanGroupList(@Param("accountEmail") String accountEmail, @Param("taskName") String taskName, @Param("valueTask") boolean valueTask);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.groupEmail = :groupEmail AND t.taskName = :taskName AND t.valueUserName = :valueUserName ORDER BY t.userEmail, t.id ASC")
    List<Tasks> findByTaskEmailAndNameListAndValueUserBoolean(@Param("accountEmail") String accountEmail, @Param("groupEmail") String groupEmail, @Param("taskName") String taskName, @Param("valueUserName") boolean valueUser);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.groupEmail = :groupEmail AND t.userEmail = :userEmail AND t.taskName = :taskName AND t.valueNumber = :valueNumber ORDER BY t.userEmail, t.id ASC")
    List<Tasks> findByTaskEmailAndNameListAndUserNameAndValueUserBooleanOrderById(@Param("accountEmail") String accountEmail, @Param("groupEmail") String groupEmail, @Param("userEmail") String userEmail, @Param("taskName") String taskName, @Param("valueNumber") boolean valueNumber);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.valueTask = :valueTask")
    List<Tasks> findAllUserEmailTasks(@Param("accountEmail") String accountEmail, @Param("valueTask") boolean valueTask);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.valueUserName = :valueUserName")
    List<Tasks> findAllUserEmail(@Param("accountEmail") String accountEmail, @Param("valueUserName") boolean valueUserName);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.valueTask = :valueTask")
    List<Tasks> findAllTasks(@Param("accountEmail") String accountEmail, @Param("valueTask") boolean valueTask);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.valueUserName = :valueUserName")
    List<Tasks> findAllUsers(@Param("accountEmail") String accountEmail, @Param("valueUserName") boolean valueUserName);
    
    @Query("SELECT t FROM Tasks t WHERE t.accountEmail = :accountEmail AND t.valueNumber = :valueNumber")
    List<Tasks> findAllExpenses(@Param("accountEmail") String accountEmail, @Param("valueNumber") boolean valueNumber);
    
}
