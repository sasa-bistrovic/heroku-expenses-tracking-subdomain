package com.by.sasa.bistrovic.expense.tracking;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
public class ExpensesController {

    @Autowired
    private ExpensesRepository expensesRepository;
    
    @Autowired
    private GroupsRepository groupsRepository;
    
    @Autowired
    private GroupsService groupsService;
    
    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
    
    public Claims decodeToken(String token) {
        String secretKey = "yourSecretKey";

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    @GetMapping
    public List<Expenses> getAllExpenses(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String userEmail="";
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Claims claims = decodeToken(token);
                userEmail = claims.getSubject();
                //return null;
            } catch (Exception e) {
                return null;
            }
        }
        
        Optional<Groups> groupOptionalAccountEmailAndCurrent = groupsRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!groupOptionalAccountEmailAndCurrent.isPresent()) {
            return Collections.emptyList(); // Return an empty list if no group is found
        }
        
        Groups currentGroup = groupOptionalAccountEmailAndCurrent.get();
        
        return expensesRepository.findByEmailAndNameAndOrderById(currentGroup.getGroupEmail(), currentGroup.getName());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expenses> getExpenseById(@PathVariable Long id) {
        Expenses expense = expensesRepository.findById(id).orElse(null);
        if (expense == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(expense);
    }

    @PostMapping
    public Expenses createExpense(@RequestBody Expenses expense, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String userEmail="";
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Claims claims = decodeToken(token);
                userEmail = claims.getSubject();
                //return null;
            } catch (Exception e) {
                return null;
            }
        }
        
        Optional<Groups> groupOptionalAccountEmailAndCurrent = groupsRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!groupOptionalAccountEmailAndCurrent.isPresent()) {
           return null;
        }
        
        Groups currentGroup = groupOptionalAccountEmailAndCurrent.get();
        
        expense.setDatetime(LocalDateTime.now());
        expense.setGroupEmail(currentGroup.getGroupEmail());
        expense.setGroupName(currentGroup.getName());
        expense.setName(currentGroup.getAlias());
        expensesRepository.save(expense);
        
        List<Expenses> expensesSaldo = expensesRepository.findByEmailAndNameAndOrderById(currentGroup.getGroupEmail(), currentGroup.getName());
        
        double limitValue = currentGroup.getLimitValue();
        
        double numberExpenses =1;
        
        for (Expenses expenseList : expensesSaldo) {
            Double price = Double.valueOf(0);

            try {
                price = round(expenseList.getPrice(),2);
            } catch (Exception e) {
            }

            String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
            price = Double.valueOf(formattedNumber);

            limitValue = limitValue + price;

            String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
            limitValue = Double.valueOf(formattedNumber2);

            //limitValue=limitValue+expenseList.getPrice();
            expenseList.setPrice(price); // Set the new saldo
            expenseList.setSaldo(limitValue); // Set the new saldo
            expenseList.setNumber(numberExpenses);
            numberExpenses=numberExpenses+1;
        }

        // Save all updated expenses
        expensesRepository.saveAll(expensesSaldo);
        
        List<Groups> allGroupEmailAndName = groupsRepository.findByGroupEmailAndNameList(currentGroup.getGroupEmail(), currentGroup.getName());
        
        for (Groups groupList : allGroupEmailAndName) {
            groupList.setBalance(limitValue); // Set the new saldo
        }
        
        groupsService.saveAllGroups(allGroupEmailAndName);   
        
        return expense;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expenses> updateExpense(@PathVariable Long id, @RequestBody Expenses expenseDetails, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Expenses expense = expensesRepository.findById(id).orElse(null);
       
        if (expense == null) {
            return ResponseEntity.notFound().build();
        }
        
        String userEmail="";
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Claims claims = decodeToken(token);
                userEmail = claims.getSubject();
                //return null;
            } catch (Exception e) {
                return ResponseEntity.noContent().build();
            }
        }
        
        if (!expense.getGroupEmail().equals(userEmail)) {
            return ResponseEntity.noContent().build();
        }

        expense.setPrice(expenseDetails.getPrice());
        
        Optional<Groups> groupOptionalAccountEmailAndCurrent = groupsRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        Groups currentGroup = groupOptionalAccountEmailAndCurrent.get();
        
        expense.setGroupEmail(currentGroup.getGroupEmail());
        expense.setGroupName(currentGroup.getName());
        expense.setName(currentGroup.getAlias());
        expensesRepository.save(expense);
        
        List<Expenses> expensesSaldo = expensesRepository.findByEmailAndNameAndOrderById(currentGroup.getGroupEmail(), currentGroup.getName());
        
        double limitValue = currentGroup.getLimitValue();
        
        double numberExpenses =1;
        
        for (Expenses expenseList : expensesSaldo) {
            Double price = Double.valueOf(0);

            try {
                price = round(expenseList.getPrice(),2);
            } catch (Exception e) {
            }

            String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
            price = Double.valueOf(formattedNumber);

            limitValue = limitValue + price;

            String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
            limitValue = Double.valueOf(formattedNumber2);
            expenseList.setPrice(price); // Set the new saldo
            expenseList.setSaldo(limitValue); // Set the new saldo
            expenseList.setNumber(numberExpenses);
            numberExpenses=numberExpenses+1;
        }

        // Save all updated expenses
        expensesRepository.saveAll(expensesSaldo);        
        
        List<Groups> allGroupEmailAndName = groupsRepository.findByGroupEmailAndNameList(currentGroup.getGroupEmail(), currentGroup.getName());
        
        for (Groups groupList : allGroupEmailAndName) {
            groupList.setBalance(limitValue); // Set the new saldo
        }
        
        groupsService.saveAllGroups(allGroupEmailAndName);        

        return ResponseEntity.ok(expense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Expenses expense = expensesRepository.findById(id).orElse(null);
        if (expense == null) {
            return ResponseEntity.notFound().build();
        }
        
        String userEmail="";
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Claims claims = decodeToken(token);
                userEmail = claims.getSubject();
                //return null;
            } catch (Exception e) {
                return ResponseEntity.noContent().build();
            }
        }
        
        if (!expense.getGroupEmail().equals(userEmail)) {
            return ResponseEntity.noContent().build();
        }

        expensesRepository.delete(expense);
        
        Optional<Groups> groupOptionalAccountEmailAndCurrent = groupsRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        Groups currentGroup = groupOptionalAccountEmailAndCurrent.get();
        
        List<Expenses> expensesSaldo = expensesRepository.findByEmailAndNameAndOrderById(currentGroup.getGroupEmail(), currentGroup.getName());
        
        double limitValue = currentGroup.getLimitValue();
        
        double numberExpenses =1;
        
        for (Expenses expenseList : expensesSaldo) {
            Double price = Double.valueOf(0);

            try {
                price = round(expenseList.getPrice(),2);
            } catch (Exception e) {
            }

            String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
            price = Double.valueOf(formattedNumber);

            limitValue = limitValue + price;

            String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
            limitValue = Double.valueOf(formattedNumber2);
            
            expenseList.setPrice(price); // Set the new saldo
            expenseList.setSaldo(limitValue); // Set the new saldo
            expenseList.setNumber(numberExpenses);
            numberExpenses=numberExpenses+1;
        }

        // Save all updated expenses
        expensesRepository.saveAll(expensesSaldo);        
        
        List<Groups> allGroupEmailAndName = groupsRepository.findByGroupEmailAndNameList(currentGroup.getGroupEmail(), currentGroup.getName());
        
        for (Groups groupList : allGroupEmailAndName) {
            groupList.setBalance(limitValue); // Set the new saldo
        }
        
        groupsService.saveAllGroups(allGroupEmailAndName);        
        
        return ResponseEntity.noContent().build();
    }
}
