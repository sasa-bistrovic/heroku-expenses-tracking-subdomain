/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.by.sasa.bistrovic.expense.tracking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpensesService {

    @Autowired
    private ExpensesRepository expenseRepository;

    public void saveAllExpenses(List<Expenses> expensesList) {
        // The saveAll method will save all the entities in the list
        expenseRepository.saveAll(expensesList);
    }

    public void deleteAllExpenses(List<Expenses> expensesList) {
        // The saveAll method will save all the entities in the list
        expenseRepository.deleteAll(expensesList);
    }    
}
