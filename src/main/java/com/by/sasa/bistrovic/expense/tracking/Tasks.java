package com.by.sasa.bistrovic.expense.tracking;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accountEmail;
    private String groupEmail;
    private Boolean copy;
    private Boolean current;
    private Boolean exceedingLimit;
    private Boolean valueNumber;
    private Boolean valueTask;
    private Boolean valueUserName;
    private LocalDateTime datetime;
    private Double limitValue;
    private String measuringUnit;
    private String taskName;
    private String userEmail;
    //private String userPassword;
    private String userName;
    private Long number;
    private String expenseDescription;
    private Double expensePrice;
    private Double balance;
    private Double saldo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountEmail() {
        return accountEmail;
    }

    public void setAccountEmail(String accountEmail) {
        this.accountEmail = accountEmail;
    }
    
    public String getGroupEmail() {
        return groupEmail;
    }

    public void setGroupEmail(String groupEmail) {
        this.groupEmail = groupEmail;
    }    

    public Boolean getCopy() {
        return copy;
    }

    public void setCopy(Boolean copy) {
        this.copy = copy;
    }

    public Boolean getCurrent() {
        return current;
    }

    public void setCurrent(Boolean current) {
        this.current = current;
    }
    
    public Boolean getExceedingLimit() {
        return exceedingLimit;
    }

    public void setExceedingLimit(Boolean exceedingLimit) {
        this.exceedingLimit = exceedingLimit;
    }
    
    public Boolean getValueNamber() {
        return valueNumber;
    }

    public void setValueNumber(Boolean valueNumber) {
        this.valueNumber = valueNumber;
    }
    
    public Boolean getValueTask() {
        return valueTask;
    }

    public void setValueTask(Boolean valueTask) {
        this.valueTask = valueTask;
    }
    
    public Boolean getValueUserName() {
        return valueUserName;
    }

    public void setValueUserName(Boolean valueUserName) {
        this.valueUserName = valueUserName;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public Double getLimitValue() {
        return limitValue;
    }

    public void setLimitValue(Double limitValue) {
        this.limitValue = limitValue;
    }

    public String getMeasuringUnit() {
        return measuringUnit;
    }

    public void setMeasuringUnit(String measuringUnit) {
        this.measuringUnit = measuringUnit;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    //public String getUserPassword() {
    //    return userPassword;
    //}

    //public void setUserPassword(String userPassword) {
    //    this.userPassword = userPassword;
    //}    

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public String getExpenseDescription() {
        return expenseDescription;
    }

    public void setExpenseDescription(String expenseDescription) {
        this.expenseDescription = expenseDescription;
    }

    public Double getExpensePrice() {
        return expensePrice;
    }

    public void setExpensePrice(Double expensePrice) {
        this.expensePrice = expensePrice;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
    
    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }
}
