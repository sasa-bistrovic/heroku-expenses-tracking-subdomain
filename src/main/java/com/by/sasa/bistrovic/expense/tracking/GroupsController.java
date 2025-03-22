package com.by.sasa.bistrovic.expense.tracking;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupsController {

    @Autowired
    private GroupsRepository groupsRepository;
    
    @Autowired
    private UsersRepository usersRepository;
    
    @Autowired
    private ExpensesService expensesService;
    
    @Autowired
    private ExpensesRepository expensesRepository;
    
    @Autowired
    private GroupsService groupsService;
    
    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    @GetMapping
    public List<Groups> getAllGroups(@RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        return groupsRepository.findAllOrderById(userEmail);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Groups> getGroupById(@PathVariable Long id) {
        Groups group = groupsRepository.findById(id).orElse(null);
        if (group == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(group);
    }
    
    public Claims decodeToken(String token) {
        String secretKey = "yourSecretKey";

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    @PostMapping
    public Groups createGroup(@RequestBody Groups group, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        if (group.getLimitValue()>0) {
            group.setLimitValue(group.getLimitValue()*-1);
            group.setBalance(group.getLimitValue()*-1);
        }
        
        if (group.getLimitValue()==0) {
            return null;
        }
        
        Double limit = Double.valueOf(0);

        try {
            limit = round(group.getLimitValue(),2);
        } catch (Exception e) {
        }

        String formattedNumber2 = String.format("%.2f", limit).replaceAll(",",".");
        limit = Double.valueOf(formattedNumber2);
        
        group.setLimitValue(limit);
        
        group.setDatetime(LocalDateTime.now());
        
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return null;
        }
        
        Optional<Users> userOptionalGroupEnabled = usersRepository.findByEmailAndEnabled(group.getGroupEmail(), true);
        
        if (!userOptionalGroupEnabled.isPresent()) {
            return null;
        }
        
        Optional<Groups> groupOptionalAccountEmailGroupEmailAndName = groupsRepository.findByAccountEmailGroupEmailAndName(group.getAccountEmail(),group.getGroupEmail(),group.getName());
        
        if (groupOptionalAccountEmailGroupEmailAndName.isPresent()) {
            return null;
        }
        
        Optional<Groups> groupOptionalAccountEmailAndCurrent = groupsRepository.findByAccountEmailAndCurrent(group.getAccountEmail(),true);
        
        if (groupOptionalAccountEmailAndCurrent.isPresent()) {
            Groups currentOptionalAccountEmailAndCurrent = groupOptionalAccountEmailAndCurrent.get();
            currentOptionalAccountEmailAndCurrent.setCurrent(false);
            groupsRepository.save(currentOptionalAccountEmailAndCurrent);
        }
        
        if (group.getAccountEmail().equals(group.getGroupEmail()) && group.getAccountEmail().equals(userEmail)) {
            group.setCopy(false);
            group.setCurrent(true);
            group.setBalance(group.getLimitValue());
            return groupsRepository.save(group);
        }
        
        if (!group.getAccountEmail().equals(group.getGroupEmail()) && group.getAccountEmail().equals(userEmail)) {
            Optional<Groups> exisitingAccountEmailAndGroupEmailAndName = groupsRepository.findByAccountEmailGroupEmailAndName(group.getGroupEmail(), group.getGroupEmail(), group.getName());
        
            if (!exisitingAccountEmailAndGroupEmailAndName.isPresent()) {
                return null;
            }
            
            Groups existingGroup=exisitingAccountEmailAndGroupEmailAndName.get();
            
            
            group.setCopy(true);
            group.setCurrent(true);
            group.setTask(existingGroup.getTask());
            group.setName(existingGroup.getName());
            group.setBalance(existingGroup.getBalance());
            group.setMeasuringUnit(existingGroup.getMeasuringUnit());
            group.setLimitValue(existingGroup.getLimitValue());
            return groupsRepository.save(group);
        }
       
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Groups> updateGroup(@PathVariable Long id, @RequestBody Groups groupDetails, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Groups group = groupsRepository.findById(id).orElse(null);
        
        Groups groupFirstValue = groupsRepository.findById(id).orElse(null);
        if (group == null) {
            return ResponseEntity.noContent().build();
        }
        
        if (groupDetails.getLimitValue()>0) {
            groupDetails.setLimitValue(groupDetails.getLimitValue()*-1);
        }
        
        if (groupDetails.getLimitValue()<0) {
            groupDetails.setLimitValue(groupDetails.getLimitValue());
        }
        
        if (groupDetails.getLimitValue()==0) {
            return ResponseEntity.ok(groupFirstValue);
        }
        
        Double limit = Double.valueOf(0);

        try {
            limit = round(group.getLimitValue(),2);
        } catch (Exception e) {
        }

        String formattedNumber3 = String.format("%.2f", limit).replaceAll(",",".");
        limit = Double.valueOf(formattedNumber3);
        
        group.setLimitValue(limit);        

        group.setTask(groupDetails.getTask());
        group.setAlias(groupDetails.getAlias());
        group.setLimitValue(groupDetails.getLimitValue());
        group.setMeasuringUnit(groupDetails.getMeasuringUnit());
                
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return ResponseEntity.ok(groupFirstValue);
        }
        
        Optional<Users> userOptionalGroupEnabled = usersRepository.findByEmailAndEnabled(group.getGroupEmail(), true);
        
        if (!userOptionalGroupEnabled.isPresent()) {
            return ResponseEntity.ok(groupFirstValue);
        }
        
        Optional<Groups> groupOptionalAccountEmailGroupEmailAndName = groupsRepository.findByAccountEmailGroupEmailAndName(group.getAccountEmail(),group.getGroupEmail(),group.getName());
        
        if (!groupOptionalAccountEmailGroupEmailAndName.isPresent()) {
            return ResponseEntity.ok(groupFirstValue);
        }
        
        Optional<Groups> groupOptionalAccountEmailAndCurrent = groupsRepository.findByAccountEmailAndCurrent(group.getAccountEmail(),true);
        
        if (groupOptionalAccountEmailAndCurrent.isPresent()) {
            Groups currentOptionalAccountEmailAndCurrent = groupOptionalAccountEmailAndCurrent.get();
            currentOptionalAccountEmailAndCurrent.setCurrent(false);
            groupsRepository.save(currentOptionalAccountEmailAndCurrent);
        }
        
        if (groupDetails.getAccountEmail().equals(groupDetails.getGroupEmail()) && groupDetails.getAccountEmail().equals(userEmail)) {
            group.setCopy(false);
            group.setCurrent(true);
            groupsRepository.save(group);
            
            List<Expenses> expensesSaldo = expensesRepository.findByEmailAndNameAndOrderById(groupDetails.getGroupEmail(), groupDetails.getName());
        
            double limitValue = groupDetails.getLimitValue();
        
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
                expenseList.setPrice(price);
                expenseList.setSaldo(limitValue); // Set the new saldo
                expenseList.setNumber(numberExpenses);
                numberExpenses=numberExpenses+1;
            }

            // Save all updated expenses
            expensesRepository.saveAll(expensesSaldo);        
        
            List<Groups> allGroupEmailAndName = groupsRepository.findByGroupEmailAndNameList(groupDetails.getGroupEmail(), groupDetails.getName());
        
            for (Groups groupList : allGroupEmailAndName) {
                groupList.setLimitValue(groupDetails.getLimitValue()); // Set the new saldo
                groupList.setBalance(limitValue); // Set the new saldo
            }
        
            groupsService.saveAllGroups(allGroupEmailAndName);        
        }
        
        if (!groupDetails.getAccountEmail().equals(groupDetails.getGroupEmail()) && groupDetails.getAccountEmail().equals(userEmail)) {
            Optional<Groups> exisitingAccountEmailAndGroupEmailAndName = groupsRepository.findByAccountEmailGroupEmailAndName(group.getGroupEmail(), group.getGroupEmail(), group.getName());
        
            if (!exisitingAccountEmailAndGroupEmailAndName.isPresent()) {
                return ResponseEntity.ok(groupFirstValue);
            }
            
            Groups existingGroup=exisitingAccountEmailAndGroupEmailAndName.get();
            
            
            group.setCopy(true);
            group.setCurrent(true);
            group.setTask(existingGroup.getTask());
            group.setName(existingGroup.getName());
            group.setBalance(existingGroup.getBalance());
            group.setMeasuringUnit((existingGroup.getMeasuringUnit()));
            group.setLimitValue(existingGroup.getLimitValue());
            groupsRepository.save(group);
        }

        return ResponseEntity.ok(group);
    }
    
    @PutMapping("/select/{id}")
    public ResponseEntity<Groups> selectGroup(@PathVariable Long id, @RequestBody Groups groupDetails, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Groups group = groupsRepository.findById(id).orElse(null);
        
        if (group == null) {
            return ResponseEntity.noContent().build();
        }
        
        Optional<Groups> userOptionalAccountEnabled = groupsRepository.findByAccountEmailAndCurrent(userEmail, true);
        
        if (userOptionalAccountEnabled.isPresent()) {
            Groups enabledGroup = userOptionalAccountEnabled.get();
            enabledGroup.setCurrent(false);
            groupsRepository.save(enabledGroup);
        }
        
        group.setCurrent(true);
        
        groupsRepository.save(group);
        
        return ResponseEntity.ok(group);
    }    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Groups group = groupsRepository.findById(id).orElse(null);
        if (group == null) {
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
        
        if (!group.getGroupEmail().equals(userEmail)) {
            groupsRepository.delete(group);
            return ResponseEntity.noContent().build();
        }

        List<Groups> listGroupEmailAndGroupName = groupsRepository.findByListGroupEmailAndName(group.getGroupEmail(), group.getName());
        
        groupsService.deleteAllGroups(listGroupEmailAndGroupName);
        
        List<Expenses> listExpensesGroupEmailAndGroupName = expensesRepository.findByEmailAndNameAndOrderById(group.getGroupEmail(), group.getName());
        
        expensesService.deleteAllExpenses(listExpensesGroupEmailAndGroupName);
        
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/by-name/{name}")
    public ResponseEntity<Void> deleteGroupByName(Groups group2) {
        Optional<Groups> group = groupsRepository.findByName(group2.getName());
        if (!group.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        groupsRepository.deleteByName(group2.getName());
        return ResponseEntity.noContent().build();
    }    
    
    @DeleteMapping("/by-email/{accountEmail}")
    public ResponseEntity<Void> deleteGroupByAccountEmail(Groups group2) {
        Optional<Groups> group = groupsRepository.findByAccountEmail(group2.getAccountEmail());
        if (!group.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        groupsRepository.deleteByAccountEmail(group2.getAccountEmail());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/by-account-email-and-name")
    public ResponseEntity<Void> deleteGroupByAccountEmailAndName(Groups group2) {
        Optional<Groups> group = groupsRepository.findByAccountEmailAndName(group2.getAccountEmail(), group2.getName());
        if (!group.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        groupsRepository.deleteByAccountEmailAndName(group2.getAccountEmail(), group2.getName());
        return ResponseEntity.noContent().build();
    }
    
    // New delete method by groupEmail and name
    @DeleteMapping("/by-group-email-and-name")
    public ResponseEntity<Void> deleteGroupByGroupEmailAndName(Groups group2) {
        Optional<Groups> group = groupsRepository.findByGroupEmailAndName(group2.getGroupEmail(), group2.getName());
        if (!group.isPresent()) {
            return ResponseEntity.noContent().build();
        }
        groupsRepository.deleteByGroupEmailAndName(group2.getGroupEmail(), group2.getName());
        return ResponseEntity.noContent().build();
    }    
}
