package com.by.sasa.bistrovic.expense.tracking;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {

    @Autowired
    private TasksRepository tasksRepository;
    
    @Autowired
    private UsersRepository usersRepository;
    
    @Autowired
    private TasksService tasksService;
    
    @Autowired
    private EmailService emailService;
    
    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
    
    @GetMapping("/getalltasks")
    public List<Tasks> getAllTasks(@RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        //Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean = tasksRepository.findByAccountEmailTaskNameAndBoolean(userEmail,true,true);
        
        //if (!taskOptionalAccountEmailTaskNameAndBoolean.isPresent()) {
        //    return null;
        //}
        
        return tasksRepository.findAllTasks(userEmail, true);
    }
    
    @GetMapping("/getallusers")
    public List<Tasks> getAllUsers(@RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        //Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean = tasksRepository.findByAccountEmailTaskNameAndBoolean(userEmail,true,true);
        
        //if (!taskOptionalAccountEmailTaskNameAndBoolean.isPresent()) {
        //    return null;
        //}
        
        return tasksRepository.findAllUsers(userEmail, true);
    }
    
    @GetMapping("/getallexpenses")
    public List<Tasks> getAllExpenses(@RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        //Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean = tasksRepository.findByAccountEmailTaskNameAndBoolean(userEmail,true,true);
        
        //if (!taskOptionalAccountEmailTaskNameAndBoolean.isPresent()) {
        //    return null;
        //}
        
        return tasksRepository.findAllExpenses(userEmail, true);
    }

    @GetMapping("/tasks")
    public List<Tasks> getAllTasksbyTasks(@RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        //Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean = tasksRepository.findByAccountEmailTaskNameAndBoolean(userEmail,true,true);
        
        //if (!taskOptionalAccountEmailTaskNameAndBoolean.isPresent()) {
        //    return null;
        //}
        
        return tasksRepository.findAllOrderByBooleanTaskId(userEmail, true);
    }
    
    @GetMapping("/users")
    public List<Tasks> getAllTasksByUserName(@RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean = tasksRepository.findByAccountEmailTaskNameAndBoolean(userEmail,true,true);
        
        if (!taskOptionalAccountEmailTaskNameAndBoolean.isPresent()) {
            return null;
        }
        
        Tasks currentTask = taskOptionalAccountEmailTaskNameAndBoolean.get();
        
        return tasksRepository.findAllOrderByBooleanUserNameId(currentTask.getGroupEmail(), currentTask.getTaskName(), true);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tasks> getTaskById(@PathVariable Long id) {
        Tasks task = tasksRepository.findById(id).orElse(null);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task);
    }
    
    public Claims decodeToken(String token) {
        String secretKey = "yourSecretKey";

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    @PostMapping("/valueusername")
    public Tasks createUserName(@RequestBody Tasks task, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Tasks task2 = task;        
        
        task.setDatetime(LocalDateTime.now());
        
        task2.setDatetime(LocalDateTime.now());
        
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return null;
        }
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!taskOptionalAccountEmailAndCurrent.isPresent()) {
            return null;
        }
        
        Tasks currentTask=taskOptionalAccountEmailAndCurrent.get();
        
        List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean = tasksRepository.findAllUserEmailTasks(task.getUserEmail(),true);
 
        //if (!taskOptionalAccountEmailTaskNameAndBoolean.isPresent()) {
        //    return null;
        //
        
        if (!task.getUserEmail().equals(userEmail)) {
        
        Tasks existingTask=null;
        
        for (Tasks myTask:taskOptionalAccountEmailTaskNameAndBoolean) {
            if (currentTask.getTaskName().equals(myTask.getTaskName())) {
                existingTask=myTask;
            }
        }
        
        if (existingTask==null) {
        } else {
            return null;
        }
        }
        //if (!taskOptionalAccountEmailTaskNameAndBooleanTask.getGroupEmail().equals(userEmail)) {
        //    return null;
        //}
        
        Optional<Tasks> taskOptionalAccountEmailUserNameTaskNameAndBoolean = tasksRepository.findByAccountEmailUserEmailAndBoolean(userEmail, task.getUserEmail(),userEmail,currentTask.getTaskName(),true);
        
        if (!currentTask.getGroupEmail().equals(userEmail)) {
            return null;
        }
        
        if (task.getUserEmail().equals(userEmail)) {
            task.setDatetime(LocalDateTime.now());
            task.setAccountEmail(userEmail);
            task.setTaskName(currentTask.getTaskName());
            task.setMeasuringUnit(currentTask.getMeasuringUnit());
            task.setLimitValue(currentTask.getLimitValue());
            task.setGroupEmail(currentTask.getGroupEmail());
            task.setCopy(false);
            task.setCurrent(false);
            task.setValueNumber(false);
            task.setValueTask(false);
            task.setValueUserName(true);
            task.setBalance(currentTask.getBalance());  
            task.setSaldo(Double.valueOf(0));
            task.setExceedingLimit(false);
            tasksRepository.save(task);
            if (currentTask.getBalance()>=0) {
            
            List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean3 = tasksRepository.findAllUserEmail(currentTask.getGroupEmail(),true);
        
            for (Tasks myTask2:taskOptionalAccountEmailTaskNameAndBoolean3) {
              if (myTask2.getExceedingLimit()==false) {
                  myTask2.setExceedingLimit(true);
                  try {
                  emailService.sendExceedingTheLimitEmail(myTask2.getUserEmail(), myTask2.getTaskName(), String.format("%.2f", -currentTask.getLimitValue()+currentTask.getBalance())+" "+myTask2.getMeasuringUnit(), String.format("%.2f", -currentTask.getLimitValue())+" "+myTask2.getMeasuringUnit());
                  } catch (UnsupportedEncodingException ex) {
                  Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
                  }
            }
            }
              
            tasksService.saveAllTasks(taskOptionalAccountEmailTaskNameAndBoolean3);  
            }
            return null;
        }
        
        if (!task.getUserEmail().equals(userEmail)) {           
            Tasks task1 = new Tasks();
            
            task1.setDatetime(LocalDateTime.now());
            task1.setAccountEmail(userEmail);
            task1.setTaskName(currentTask.getTaskName());
            task1.setMeasuringUnit(currentTask.getMeasuringUnit());
            task1.setLimitValue(currentTask.getLimitValue());
            task1.setGroupEmail(currentTask.getGroupEmail());
            task1.setUserName(task.getUserName());
            task1.setUserEmail(task.getUserEmail());
            task1.setCopy(false);
            task1.setCurrent(false);
            task1.setValueNumber(false);
            task1.setValueTask(false);
            task1.setValueUserName(true);
            task1.setBalance(currentTask.getBalance());
            task1.setSaldo(Double.valueOf(0));
            task1.setExceedingLimit(false);
            tasksRepository.save(task1);
            task1 = new Tasks();
            task1.setDatetime(LocalDateTime.now());
            task1.setAccountEmail(task.getUserEmail());
            task1.setTaskName(currentTask.getTaskName());
            task1.setMeasuringUnit(currentTask.getMeasuringUnit());
            task1.setLimitValue(currentTask.getLimitValue());
            task1.setGroupEmail(currentTask.getGroupEmail());
            task1.setUserName(task.getUserName());
            task1.setUserEmail(task.getUserEmail());            
            task1.setCopy(true);
            task1.setCurrent(false);
            task1.setValueNumber(false);
            task1.setValueTask(true);
            task1.setValueUserName(false);
            task1.setBalance(currentTask.getBalance());
            task1.setSaldo(Double.valueOf(0));
            task1.setExceedingLimit(false);
            tasksRepository.save(task1);
            if (currentTask.getBalance()>=0) {
            
            List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean3 = tasksRepository.findAllUserEmail(currentTask.getGroupEmail(),true);
        
            for (Tasks myTask2:taskOptionalAccountEmailTaskNameAndBoolean3) {
              if (myTask2.getExceedingLimit()==false) {
                  myTask2.setExceedingLimit(true);
                  try {
                  emailService.sendExceedingTheLimitEmail(myTask2.getUserEmail(), myTask2.getTaskName(), String.format("%.2f", -currentTask.getLimitValue()+currentTask.getBalance())+" "+myTask2.getMeasuringUnit(), String.format("%.2f", -currentTask.getLimitValue())+" "+myTask2.getMeasuringUnit());
                  } catch (UnsupportedEncodingException ex) {
                  Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
                  }
            }
            }
              
            tasksService.saveAllTasks(taskOptionalAccountEmailTaskNameAndBoolean3);  
            }
            return null;
        }
        
        return null;
    }
    
    @PostMapping("/valuetask")
    public Tasks createTask(@RequestBody Tasks task, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        if (task.getLimitValue()>0) {
            task.setLimitValue(task.getLimitValue()*-1);
            task.setBalance(task.getLimitValue()*-1);
        }
        
        if (task.getLimitValue()==0) {
            return null;
        }
        
        Double limit = Double.valueOf(0);

        try {
            limit = round(task.getLimitValue(),2);
        } catch (Exception e) {
        }

        String formattedNumber2 = String.format("%.2f", limit).replaceAll(",",".");
        limit = Double.valueOf(formattedNumber2);
        
        task.setLimitValue(limit);
        
        task.setDatetime(LocalDateTime.now());
        
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return null;
        }
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent2 = tasksRepository.findByAccountEmailAndName(userEmail,task.getTaskName());
        
        if (taskOptionalAccountEmailAndCurrent2.isPresent()) {
            return null;
        }
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (taskOptionalAccountEmailAndCurrent.isPresent()) {
            Tasks currentOptionalAccountEmailAndCurrent = taskOptionalAccountEmailAndCurrent.get();
            currentOptionalAccountEmailAndCurrent.setCurrent(false);
            tasksRepository.save(currentOptionalAccountEmailAndCurrent);
        }
        
            task.setAccountEmail(userEmail);
            task.setGroupEmail(userEmail);
            task.setCopy(false);
            task.setCurrent(true);
            task.setValueNumber(false);
            task.setValueTask(true);
            task.setValueUserName(false);
            task.setExceedingLimit(false);
            task.setBalance(task.getLimitValue());
            task.setSaldo(Double.valueOf(0));
            return tasksRepository.save(task);
    }    
    
    @PostMapping("/valueexpense")
    public Tasks createPrice(@RequestBody Tasks task, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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

        task.setDatetime(LocalDateTime.now());
        
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return null;
        }
        
        Optional<Tasks> taskOptionalAccountEmailTaskEmailAndBoolean = tasksRepository.findByAccountEmailTaskNameAndBoolean(userEmail,true, true);
        
        if (!taskOptionalAccountEmailTaskEmailAndBoolean.isPresent()) {
            return null;
        }        
        
        Tasks currentTask = taskOptionalAccountEmailTaskEmailAndBoolean.get();
        
        Optional<Tasks> taskOptionalAccountEmailUserNameAndBoolean = tasksRepository.findByAccountEmailUserEmailAndBoolean(currentTask.getGroupEmail(), userEmail,currentTask.getGroupEmail(),currentTask.getTaskName(), true);
        
        if (!taskOptionalAccountEmailUserNameAndBoolean.isPresent()) {
            return null;
        }
        
        Tasks myTask=taskOptionalAccountEmailUserNameAndBoolean.get();
        
        Tasks currentTaskUserEmail = taskOptionalAccountEmailTaskEmailAndBoolean.get();
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
            task.setAccountEmail(currentTaskUserEmail.getGroupEmail());
            task.setGroupEmail(currentTaskUserEmail.getGroupEmail());
            task.setUserEmail(myTask.getUserEmail());
            task.setUserName(myTask.getUserName());
            task.setTaskName(currentTask.getTaskName());
            task.setMeasuringUnit(currentTask.getMeasuringUnit());
            task.setLimitValue(currentTask.getLimitValue());
            task.setCopy(false);
            task.setCurrent(false);
            task.setValueNumber(true);
            task.setValueTask(false);
            task.setValueUserName(false);
            tasksRepository.save(task);
            
            List<Tasks> expensesSaldo = tasksRepository.findByEmailAndNameAndBooleanAndOrderById(task.getGroupEmail(), task.getTaskName(), true);
                                                       
            
        Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean5 = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!taskOptionalAccountEmailTaskNameAndBoolean5.isPresent()) {
        //    return null;
        }
        
        Tasks currentTask5 = taskOptionalAccountEmailTaskNameAndBoolean5.get();
        
        List<Tasks> taskOptionalAccountEmailUserNameAndBoolean5 = tasksRepository.findByTaskEmailAndNameListAndValueUserBoolean(currentTask.getGroupEmail(),currentTask.getGroupEmail(),currentTask.getTaskName(), true);
                
        double limitValue = task.getLimitValue();
            
            double limitValue2 = 0;
            
            String nadeno="";
        
            long numberExpenses =1;
      
        for (Tasks taskList : taskOptionalAccountEmailUserNameAndBoolean5) {
            List<Tasks> userTask = tasksRepository.findByTaskEmailAndNameListAndUserNameAndValueUserBooleanOrderById(currentTask5.getGroupEmail(),currentTask5.getGroupEmail(),taskList.getUserEmail(),currentTask5.getTaskName(), true);
            for (Tasks expenseList : userTask) {
                if (!expenseList.getUserEmail().equals(nadeno)) {
                    nadeno=expenseList.getUserEmail();
                    limitValue2=0;
                    numberExpenses=1;
                }
                Double price = Double.valueOf(0);

                try {
                    price = round(expenseList.getExpensePrice(),2);
                } catch (Exception e) {
                }

                String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
                price = Double.valueOf(formattedNumber);

                limitValue = limitValue + price;
                
                limitValue2 = limitValue2 + price;

                String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
                limitValue = Double.valueOf(formattedNumber2);
                String formattedNumber4 = String.format("%.2f", limitValue2).replaceAll(",",".");
                limitValue2 = Double.valueOf(formattedNumber4);
                expenseList.setExpensePrice(price);
                expenseList.setBalance(limitValue); // Set the new saldo
                expenseList.setSaldo(limitValue2); // Set the new saldo
                expenseList.setNumber(numberExpenses);
                expenseList.setMeasuringUnit(currentTask.getMeasuringUnit());
                numberExpenses=numberExpenses+1;
            }
            tasksRepository.saveAll(userTask);        
        }
        
//            for (Tasks expenseList : expensesSaldo) {

//            }

            // Save all updated expenses
        
            List<Tasks> allTaskEmailAndName = tasksRepository.findByTaskEmailAndNameList(task.getGroupEmail(), task.getTaskName(), true);
        
            for (Tasks taskList : allTaskEmailAndName) {
                taskList.setLimitValue(task.getLimitValue()); // Set the new saldo
                taskList.setBalance(limitValue); // Set the new saldo
                taskList.setMeasuringUnit(currentTask.getMeasuringUnit());
            }
        
            tasksService.saveAllTasks(allTaskEmailAndName);
            
            
            if (limitValue>=0) {
            
            List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean3 = tasksRepository.findAllUserEmail(currentTask.getGroupEmail(),true);
        
            for (Tasks myTask2:taskOptionalAccountEmailTaskNameAndBoolean3) {
              if (myTask2.getExceedingLimit()==false) {
                  myTask2.setExceedingLimit(true);
                  try {
                  emailService.sendExceedingTheLimitEmail(myTask2.getUserEmail(), myTask2.getTaskName(), String.format("%.2f", -task.getLimitValue()+limitValue)+" "+myTask2.getMeasuringUnit(), String.format("%.2f", -task.getLimitValue())+" "+myTask2.getMeasuringUnit());
                  } catch (UnsupportedEncodingException ex) {
                  Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
                  }
            }
            }
              
            tasksService.saveAllTasks(taskOptionalAccountEmailTaskNameAndBoolean3);  
            }
            return null;
    }    

    @PutMapping("/tasks/{id}")
    public ResponseEntity<Tasks> updateTask(@PathVariable Long id, @RequestBody Tasks taskDetails, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Tasks task = tasksRepository.findById(id).orElse(null);
        
        Tasks taskFirstValue = tasksRepository.findById(id).orElse(null);
        if (task == null) {
            return ResponseEntity.noContent().build();
        }
        
        if (taskDetails.getLimitValue()>0) {
            taskDetails.setLimitValue(taskDetails.getLimitValue()*-1);
        }
        
        if (taskDetails.getLimitValue()<0) {
            taskDetails.setLimitValue(taskDetails.getLimitValue());
        }
        
        if (taskDetails.getLimitValue()==0) {
            return ResponseEntity.ok(taskFirstValue);
        }
        
        if (!task.getGroupEmail().equals(userEmail)) {
            return ResponseEntity.noContent().build();
        }
        
        Double limit = Double.valueOf(0);

        try {
            limit = round(taskDetails.getLimitValue(),2);
        } catch (Exception e) {
        }

        String formattedNumber3 = String.format("%.2f", limit).replaceAll(",",".");
        limit = Double.valueOf(formattedNumber3);
        
        task.setLimitValue(limit);        

        task.setTaskName(taskDetails.getTaskName());
        task.setUserName(taskDetails.getUserName());
        task.setLimitValue(taskDetails.getLimitValue());
        task.setMeasuringUnit(taskDetails.getMeasuringUnit());
                
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return ResponseEntity.ok(taskFirstValue);
        }
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent = tasksRepository.findByAccountEmailTaskNameAndBoolean(userEmail,true,true);
        
        Tasks currentOptionalAccountEmailAndCurrent = taskOptionalAccountEmailAndCurrent.get();
        
        if (taskOptionalAccountEmailAndCurrent.isPresent()) {
            currentOptionalAccountEmailAndCurrent.setCurrent(false);
            tasksRepository.save(currentOptionalAccountEmailAndCurrent);
        }
        
        Optional<Tasks> task2 = tasksRepository.findByTaskEmailAndNameListAndBooleanGroup(userEmail,task.getTaskName(),true);
        
        Tasks task3 = task2.get();
        
//        if (taskDetails.getAccountEmail().equals(taskDetails.getUserEmail()) && taskDetails.getAccountEmail().equals(userEmail)) {
            task3.setLimitValue(limit);        

            task3.setMeasuringUnit(taskDetails.getMeasuringUnit());
            task3.setCopy(false);
            task3.setCurrent(true);
            tasksRepository.save(task3);
            
     
        Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean5 = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!taskOptionalAccountEmailTaskNameAndBoolean5.isPresent()) {
        //    return null;
        }
        
        Tasks currentTask5 = taskOptionalAccountEmailTaskNameAndBoolean5.get();
        
        List<Tasks> taskOptionalAccountEmailUserNameAndBoolean5 = tasksRepository.findByTaskEmailAndNameListAndValueUserBoolean(currentTask5.getGroupEmail(),currentTask5.getGroupEmail(),currentTask5.getTaskName(), true);
                
        double limitValue = task.getLimitValue();
            
            double limitValue2 = 0;
            
            String nadeno="";
        
            long numberExpenses =1;
      
        for (Tasks taskList : taskOptionalAccountEmailUserNameAndBoolean5) {
            List<Tasks> userTask = tasksRepository.findByTaskEmailAndNameListAndUserNameAndValueUserBooleanOrderById(currentTask5.getGroupEmail(),currentTask5.getGroupEmail(),taskList.getUserEmail(),currentTask5.getTaskName(), true);
            for (Tasks expenseList : userTask) {
                if (!expenseList.getUserEmail().equals(nadeno)) {
                    nadeno=expenseList.getUserEmail();
                    limitValue2=0;
                    numberExpenses=1;
                }
                Double price = Double.valueOf(0);

                try {
                    price = round(expenseList.getExpensePrice(),2);
                } catch (Exception e) {
                }

                String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
                price = Double.valueOf(formattedNumber);

                limitValue = limitValue + price;
                
                limitValue2 = limitValue2 + price;

                String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
                limitValue = Double.valueOf(formattedNumber2);
                String formattedNumber4 = String.format("%.2f", limitValue2).replaceAll(",",".");
                limitValue2 = Double.valueOf(formattedNumber4);
                expenseList.setExpensePrice(price);
                expenseList.setBalance(limitValue); // Set the new saldo
                expenseList.setSaldo(limitValue2); // Set the new saldo
                expenseList.setNumber(numberExpenses);
                expenseList.setMeasuringUnit(currentTask5.getMeasuringUnit());
                numberExpenses=numberExpenses+1;
            }
            tasksRepository.saveAll(userTask);        
        }
        
            List<Tasks> allTaskEmailAndName = tasksRepository.findByTaskEmailAndNameList(task3.getGroupEmail(), task3.getTaskName(), true);
        
            for (Tasks taskList : allTaskEmailAndName) {
                taskList.setLimitValue(taskDetails.getLimitValue()); // Set the new saldo
                taskList.setBalance(limitValue); // Set the new saldo
                taskList.setMeasuringUnit(taskDetails.getMeasuringUnit());
            }
        
            tasksService.saveAllTasks(allTaskEmailAndName);
            
            if (limitValue>=0) {
            
            List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean3 = tasksRepository.findAllUserEmail(taskDetails.getGroupEmail(),true);
        
            for (Tasks myTask2:taskOptionalAccountEmailTaskNameAndBoolean3) {
              if (myTask2.getExceedingLimit()==false) {
                  myTask2.setExceedingLimit(true);
                  try {
                  emailService.sendExceedingTheLimitEmail(myTask2.getUserEmail(), myTask2.getTaskName(), String.format("%.2f", -task.getLimitValue()+limitValue)+" "+myTask2.getMeasuringUnit(), String.format("%.2f", -task.getLimitValue())+" "+myTask2.getMeasuringUnit());
                  } catch (UnsupportedEncodingException ex) {
                  Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
                  }
            }
            }
              
            tasksService.saveAllTasks(taskOptionalAccountEmailTaskNameAndBoolean3);  
            }

        return ResponseEntity.ok(task);
    }
    
    @PutMapping("/users/{id}")
    public ResponseEntity<Tasks> updateUsers(@PathVariable Long id, @RequestBody Tasks taskDetails, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Tasks task = tasksRepository.findById(id).orElse(null);
        
        Tasks taskFirstValue = tasksRepository.findById(id).orElse(null);
        if (task == null) {
            return ResponseEntity.noContent().build();
        }
        
        if (!task.getGroupEmail().equals(userEmail)) {
            return ResponseEntity.noContent().build();
        }
        
        task.setUserName(taskDetails.getUserName());
                
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return ResponseEntity.ok(taskFirstValue);
        }
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (taskOptionalAccountEmailAndCurrent.isPresent()) {
            Tasks currentOptionalAccountEmailAndCurrent = taskOptionalAccountEmailAndCurrent.get();
            tasksRepository.save(currentOptionalAccountEmailAndCurrent);
        }
        
//        if (taskDetails.getAccountEmail().equals(taskDetails.getUserEmail()) && taskDetails.getAccountEmail().equals(userEmail)) {
            tasksRepository.save(task);
            
        Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean5 = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!taskOptionalAccountEmailTaskNameAndBoolean5.isPresent()) {
        //    return null;
        }
        
        Tasks currentTask5 = taskOptionalAccountEmailTaskNameAndBoolean5.get();
        
        List<Tasks> taskOptionalAccountEmailUserNameAndBoolean5 = tasksRepository.findByTaskEmailAndNameListAndValueUserBoolean(currentTask5.getGroupEmail(),currentTask5.getGroupEmail(),currentTask5.getTaskName(), true);
                
        double limitValue = task.getLimitValue();
            
            double limitValue2 = 0;
            
            String nadeno="";
        
            long numberExpenses =1;
      
        for (Tasks taskList : taskOptionalAccountEmailUserNameAndBoolean5) {
            List<Tasks> userTask = tasksRepository.findByTaskEmailAndNameListAndUserNameAndValueUserBooleanOrderById(currentTask5.getGroupEmail(),currentTask5.getGroupEmail(),taskList.getUserEmail(),currentTask5.getTaskName(), true);
            for (Tasks expenseList : userTask) {
                if (!expenseList.getUserEmail().equals(nadeno)) {
                    nadeno=expenseList.getUserEmail();
                    limitValue2=0;
                    numberExpenses=1;
                }
                Double price = Double.valueOf(0);

                try {
                    price = round(expenseList.getExpensePrice(),2);
                } catch (Exception e) {
                }

                String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
                price = Double.valueOf(formattedNumber);

                limitValue = limitValue + price;
                
                limitValue2 = limitValue2 + price;

                String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
                limitValue = Double.valueOf(formattedNumber2);
                String formattedNumber4 = String.format("%.2f", limitValue2).replaceAll(",",".");
                limitValue2 = Double.valueOf(formattedNumber4);
                expenseList.setExpensePrice(price);
                expenseList.setBalance(limitValue); // Set the new saldo
                expenseList.setSaldo(limitValue2); // Set the new saldo
                expenseList.setNumber(numberExpenses);
                expenseList.setMeasuringUnit(currentTask5.getMeasuringUnit());
                numberExpenses=numberExpenses+1;
            }
            tasksRepository.saveAll(userTask);        
        }
        
            List<Tasks> allTaskEmailAndName = tasksRepository.findByTaskEmailAndNameList(task.getGroupEmail(), task.getTaskName(), true);
        
            for (Tasks taskList : allTaskEmailAndName) {
                //taskList.setLimitValue(taskDetails.getLimitValue()); // Set the new saldo
                taskList.setBalance(limitValue); // Set the new saldo
                //taskList.setMeasuringUnit(taskDetails.getMeasuringUnit());
            }
        
            tasksService.saveAllTasks(allTaskEmailAndName);
            
            if (limitValue>=0) {
            
            List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean3 = tasksRepository.findAllUserEmail(taskDetails.getGroupEmail(),true);
        
            for (Tasks myTask2:taskOptionalAccountEmailTaskNameAndBoolean3) {
              if (myTask2.getExceedingLimit()==false) {
                  myTask2.setExceedingLimit(true);
                  try {
                  emailService.sendExceedingTheLimitEmail(myTask2.getUserEmail(), myTask2.getTaskName(), String.format("%.2f", -task.getLimitValue()+limitValue)+" "+myTask2.getMeasuringUnit(), String.format("%.2f", -task.getLimitValue())+" "+myTask2.getMeasuringUnit());
                  } catch (UnsupportedEncodingException ex) {
                  Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
                  }
            }
            }
              
            tasksService.saveAllTasks(taskOptionalAccountEmailTaskNameAndBoolean3);  
            }

        return ResponseEntity.ok(task);
    }    
    
    @PutMapping("/expenses/{id}")
    public ResponseEntity<Tasks> updatePrice(@PathVariable Long id, @RequestBody Tasks taskDetails, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Tasks task = tasksRepository.findById(id).orElse(null);
        
        Tasks taskFirstValue = tasksRepository.findById(id).orElse(null);
        if (task == null) {
            return ResponseEntity.noContent().build();
        }
        
        if (!task.getGroupEmail().equals(userEmail)) {
            return ResponseEntity.noContent().build();
        }
        
        task.setExpensePrice(taskDetails.getExpensePrice());
        task.setExpenseDescription(taskDetails.getExpenseDescription());
                
        Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);
        
        if (!userOptionalAccountEnabled.isPresent()) {
            return ResponseEntity.ok(taskFirstValue);
        }
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        Tasks currentOptionalAccountEmailAndCurrent = taskOptionalAccountEmailAndCurrent.get();
        
        if (taskOptionalAccountEmailAndCurrent.isPresent()) {
            tasksRepository.save(currentOptionalAccountEmailAndCurrent);
        }
        
//        if (taskDetails.getAccountEmail().equals(taskDetails.getUserEmail()) && taskDetails.getAccountEmail().equals(userEmail)) {
            tasksRepository.save(task);
            
        Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean5 = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!taskOptionalAccountEmailTaskNameAndBoolean5.isPresent()) {
        //    return null;
        }
        
        Tasks currentTask5 = taskOptionalAccountEmailTaskNameAndBoolean5.get();
        
        List<Tasks> taskOptionalAccountEmailUserNameAndBoolean5 = tasksRepository.findByTaskEmailAndNameListAndValueUserBoolean(currentTask5.getGroupEmail(),currentTask5.getGroupEmail(),currentTask5.getTaskName(), true);
                
        double limitValue = task.getLimitValue();
            
            double limitValue2 = 0;
            
            String nadeno="";
        
            long numberExpenses =1;
      
        for (Tasks taskList : taskOptionalAccountEmailUserNameAndBoolean5) {
            List<Tasks> userTask = tasksRepository.findByTaskEmailAndNameListAndUserNameAndValueUserBooleanOrderById(currentTask5.getGroupEmail(),currentTask5.getGroupEmail(),taskList.getUserEmail(),currentTask5.getTaskName(), true);
            for (Tasks expenseList : userTask) {
                if (!expenseList.getUserEmail().equals(nadeno)) {
                    nadeno=expenseList.getUserEmail();
                    limitValue2=0;
                    numberExpenses=1;
                }
                Double price = Double.valueOf(0);

                try {
                    price = round(expenseList.getExpensePrice(),2);
                } catch (Exception e) {
                }

                String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
                price = Double.valueOf(formattedNumber);

                limitValue = limitValue + price;
                
                limitValue2 = limitValue2 + price;

                String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
                limitValue = Double.valueOf(formattedNumber2);
                String formattedNumber4 = String.format("%.2f", limitValue2).replaceAll(",",".");
                limitValue2 = Double.valueOf(formattedNumber4);
                expenseList.setExpensePrice(price);
                expenseList.setBalance(limitValue); // Set the new saldo
                expenseList.setSaldo(limitValue2); // Set the new saldo
                expenseList.setNumber(numberExpenses);
                expenseList.setMeasuringUnit(currentTask5.getMeasuringUnit());
                numberExpenses=numberExpenses+1;
            }
            tasksRepository.saveAll(userTask);        
        }
        
            List<Tasks> allTaskEmailAndName = tasksRepository.findByTaskEmailAndNameList(task.getGroupEmail(), task.getTaskName(), true);
        
            for (Tasks taskList : allTaskEmailAndName) {
                //taskList.setLimitValue(taskDetails.getLimitValue()); // Set the new saldo
                //taskList.setMeasuringUnit(currentOptionalAccountEmailAndCurrent.getMeasuringUnit());
                taskList.setBalance(limitValue); // Set the new saldo
            }
        
            tasksService.saveAllTasks(allTaskEmailAndName);        
            
            if (limitValue>=0) {
            
            List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean3 = tasksRepository.findAllUserEmail(taskDetails.getGroupEmail(),true);
        
            for (Tasks myTask2:taskOptionalAccountEmailTaskNameAndBoolean3) {
              if (myTask2.getExceedingLimit()==false) {
                  myTask2.setExceedingLimit(true);
                  try {
                  emailService.sendExceedingTheLimitEmail(myTask2.getUserEmail(), myTask2.getTaskName(), String.format("%.2f", -task.getLimitValue()+limitValue)+" "+myTask2.getMeasuringUnit(), String.format("%.2f", -task.getLimitValue())+" "+myTask2.getMeasuringUnit());
                  } catch (UnsupportedEncodingException ex) {
                  Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
                  }
            }
            }
              
            tasksService.saveAllTasks(taskOptionalAccountEmailTaskNameAndBoolean3);  
            }

        return ResponseEntity.ok(task);
    }    
    
    @PutMapping("/select/{id}")
    public ResponseEntity<Tasks> selectTask(@PathVariable Long id, @RequestBody Tasks taskDetails, @RequestHeader(value = "Authorization", required = false) String authHeader) {
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
        
        Tasks task = tasksRepository.findById(id).orElse(null);
        
        if (task == null) {
            return ResponseEntity.noContent().build();
        }
        
        Optional<Tasks> userOptionalAccountEnabled = tasksRepository.findByAccountEmailAndCurrent(userEmail, true);
        
        if (userOptionalAccountEnabled.isPresent()) {
            Tasks enabledTask = userOptionalAccountEnabled.get();
            enabledTask.setCurrent(false);
            tasksRepository.save(enabledTask);
        }
        
        task.setCurrent(true);
        
        tasksRepository.save(task);
        
        return ResponseEntity.ok(task);
    }    

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Tasks task = tasksRepository.findById(id).orElse(null);
        if (task == null) {
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
        
        if (!task.getGroupEmail().equals(userEmail)) {
            //tasksRepository.delete(task);
            return ResponseEntity.noContent().build();
        }

        List<Tasks> listTaskEmailAndTaskName = tasksRepository.findByListTaskEmailAndName(task.getGroupEmail(), task.getTaskName());
        
        tasksService.deleteAllTasks(listTaskEmailAndTaskName);
        
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        Tasks task = tasksRepository.findById(id).orElse(null);
        if (task == null) {
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
        
        if (!task.getGroupEmail().equals(userEmail)) {
            //List<Tasks> listTaskEmailAndTaskName = tasksRepository.findByListTaskEmailAndNameUserCopy(userEmail, task.getGroupEmail(), task.getTaskName(), true, true);
            //tasksService.deleteAllTasks(listTaskEmailAndTaskName);
            return ResponseEntity.noContent().build();
        }

        List<Tasks> listTaskEmailAndTaskName = tasksRepository.findByListTaskEmailAndNameUser(task.getGroupEmail(), task.getTaskName(), task.getUserEmail());
        
        tasksService.deleteAllTasks(listTaskEmailAndTaskName);
        
        Optional<Tasks> taskOptionalAccountEmailAndCurrent = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);
        
        if (!taskOptionalAccountEmailAndCurrent.isPresent()) {
            return null;
        }
        
        Tasks currentTask=taskOptionalAccountEmailAndCurrent.get();
        
        List<Tasks> taskOptionalAccountEmailUserNameAndBoolean5 = tasksRepository.findByTaskEmailAndNameListAndValueUserBoolean(currentTask.getGroupEmail(),currentTask.getGroupEmail(),currentTask.getTaskName(), true);
                
        double limitValue = task.getLimitValue();
            
            double limitValue2 = 0;
            
            String nadeno="";
        
            long numberExpenses =1;
      
        for (Tasks taskList : taskOptionalAccountEmailUserNameAndBoolean5) {
            List<Tasks> userTask = tasksRepository.findByTaskEmailAndNameListAndUserNameAndValueUserBooleanOrderById(currentTask.getGroupEmail(),currentTask.getGroupEmail(),taskList.getUserEmail(),currentTask.getTaskName(), true);
            for (Tasks expenseList : userTask) {
                if (!expenseList.getUserEmail().equals(nadeno)) {
                    nadeno=expenseList.getUserEmail();
                    limitValue2=0;
                    numberExpenses=1;
                }
                Double price = Double.valueOf(0);

                try {
                    price = round(expenseList.getExpensePrice(),2);
                } catch (Exception e) {
                }

                String formattedNumber = String.format("%.2f", price).replaceAll(",",".");
                price = Double.valueOf(formattedNumber);

                limitValue = limitValue + price;
                
                limitValue2 = limitValue2 + price;

                String formattedNumber2 = String.format("%.2f", limitValue).replaceAll(",",".");
                limitValue = Double.valueOf(formattedNumber2);
                String formattedNumber4 = String.format("%.2f", limitValue2).replaceAll(",",".");
                limitValue2 = Double.valueOf(formattedNumber4);
                expenseList.setExpensePrice(price);
                expenseList.setBalance(limitValue); // Set the new saldo
                expenseList.setSaldo(limitValue2); // Set the new saldo
                expenseList.setNumber(numberExpenses);
                expenseList.setMeasuringUnit(currentTask.getMeasuringUnit());
                numberExpenses=numberExpenses+1;
            }
            tasksRepository.saveAll(userTask);        
        }
        
//            for (Tasks expenseList : expensesSaldo) {

//            }

            // Save all updated expenses
        
            List<Tasks> allTaskEmailAndName = tasksRepository.findByTaskEmailAndNameList(task.getGroupEmail(), task.getTaskName(), true);
        
            for (Tasks taskList : allTaskEmailAndName) {
                taskList.setLimitValue(task.getLimitValue()); // Set the new saldo
                taskList.setBalance(limitValue); // Set the new saldo
                taskList.setMeasuringUnit(currentTask.getMeasuringUnit());
            }
        
            tasksService.saveAllTasks(allTaskEmailAndName);
            
            
            if (limitValue>=0) {
            
            List<Tasks> taskOptionalAccountEmailTaskNameAndBoolean3 = tasksRepository.findAllUserEmail(currentTask.getGroupEmail(),true);
        
            for (Tasks myTask2:taskOptionalAccountEmailTaskNameAndBoolean3) {
              if (myTask2.getExceedingLimit()==false) {
                  myTask2.setExceedingLimit(true);
                  try {
                  emailService.sendExceedingTheLimitEmail(myTask2.getUserEmail(), myTask2.getTaskName(), String.format("%.2f", -task.getLimitValue()+limitValue)+" "+myTask2.getMeasuringUnit(), String.format("%.2f", -task.getLimitValue())+" "+myTask2.getMeasuringUnit());
                  } catch (UnsupportedEncodingException ex) {
                  Logger.getLogger(UsersController.class.getName()).log(Level.SEVERE, null, ex);
                  }
            }
            }
              
            tasksService.saveAllTasks(taskOptionalAccountEmailTaskNameAndBoolean3);  
            }
        
        return ResponseEntity.noContent().build();
    }    

    @DeleteMapping("/by-name/{name}")
    public ResponseEntity<Void> deleteTaskByName(Tasks task2) {
        Optional<Tasks> task = tasksRepository.findByTaskName(task2.getTaskName());
        if (!task.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tasksRepository.deleteByTaskName(task2.getTaskName());
        return ResponseEntity.noContent().build();
    }    
    
    @DeleteMapping("/by-email/{accountEmail}")
    public ResponseEntity<Void> deleteTaskByAccountEmail(Tasks task2) {
        Optional<Tasks> task = tasksRepository.findByAccountEmail(task2.getAccountEmail());
        if (!task.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tasksRepository.deleteByAccountEmail(task2.getAccountEmail());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/by-account-email-and-name")
    public ResponseEntity<Void> deleteTaskByAccountEmailAndName(Tasks task2) {
        Optional<Tasks> task = tasksRepository.findByAccountEmailAndName(task2.getAccountEmail(), task2.getTaskName());
        if (!task.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tasksRepository.deleteByAccountEmailAndName(task2.getAccountEmail(), task2.getTaskName());
        return ResponseEntity.noContent().build();
    }
    
    // New delete method by taskEmail and name
    @DeleteMapping("/by-task-email-and-name")
    public ResponseEntity<Void> deleteTaskByTaskEmailAndName(Tasks task2) {
        Optional<Tasks> task = tasksRepository.findByTaskEmailAndName(task2.getUserEmail(), task2.getTaskName());
        if (!task.isPresent()) {
            return ResponseEntity.noContent().build();
        }
        tasksRepository.deleteByTaskEmailAndName(task2.getUserEmail(), task2.getTaskName());
        return ResponseEntity.noContent().build();
    }    
}
