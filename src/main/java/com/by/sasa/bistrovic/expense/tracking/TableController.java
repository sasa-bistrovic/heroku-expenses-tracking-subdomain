package com.by.sasa.bistrovic.expense.tracking;

// TableController.java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import java.text.DecimalFormat;

@RestController
@RequestMapping("/api/tables")
public class TableController {
    
    @Autowired
    private TasksRepository tasksRepository;

    @Autowired
    private UsersRepository usersRepository;    
    
    public Claims decodeToken(String token) {
        String secretKey = "yourSecretKey";

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

@GetMapping
public List<TableData> getFakeTables(@RequestHeader(value = "Authorization", required = false) String authHeader) {

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

    List<TableData> fakeData = new ArrayList<>();

    Optional<Users> userOptionalAccountEnabled = usersRepository.findByEmailAndEnabled(userEmail, true);

    if (!userOptionalAccountEnabled.isPresent()) {
        return null;
    }

    Optional<Tasks> taskOptionalAccountEmailTaskNameAndBoolean = tasksRepository.findByAccountEmailAndCurrent(userEmail,true);

    if (!taskOptionalAccountEmailTaskNameAndBoolean.isPresent()) {
        return null;
    }

    Tasks currentTask = taskOptionalAccountEmailTaskNameAndBoolean.get();

    List<Tasks> taskOptionalAccountEmailUserNameAndBoolean = tasksRepository.findByTaskEmailAndNameListAndValueUserBoolean(currentTask.getGroupEmail(),currentTask.getGroupEmail(),currentTask.getTaskName(), true);

    //if (!taskOptionalAccountEmailUserNameAndBoolean.isPresent()) {
    //    return null;
    //}
    Integer taskInteger=1;

    for (Tasks taskList : taskOptionalAccountEmailUserNameAndBoolean) {
        // Define titles for each table
        List<String> titles = Arrays.asList(taskList.getUserName());
        // Define common headers
        List<String> headers = Arrays.asList("No.", "Description", "MU", "Expense");
        // Define rows based on the table index
        List<List<String>> rows = new ArrayList<>();

        // Adding rows dynamically based on the table index
        List<Tasks> userTask = tasksRepository.findByTaskEmailAndNameListAndUserNameAndValueUserBooleanOrderById(currentTask.getGroupEmail(),currentTask.getGroupEmail(),taskList.getUserEmail(),currentTask.getTaskName(), true);

        Tasks myTask = null;

        for (Tasks userList : userTask) {
            DecimalFormat df = new DecimalFormat("#,##0.00");
            String formattedPrice = df.format(userList.getExpensePrice());    
            rows.add(Arrays.asList(userList.getNumber().toString(), userList.getExpenseDescription(), userList.getMeasuringUnit(), formattedPrice));
            myTask=userList;
        }

        // Define total values based on the table index
        List<String> total = null;

        if (myTask==null) {
            total = Arrays.asList("", "", "Total", String.format("%.2f", Double.valueOf(0)));
        } else {
            DecimalFormat df = new DecimalFormat("#,##0.00");
            String formattedPrice = df.format(myTask.getSaldo());        
            total = Arrays.asList("", "", "Total", formattedPrice);    
        }

        // Create a TableData object and add it to the list

        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        // Get the current date and time
        //LocalDateTime now = LocalDateTime.now();
        // Format the date and time as a string
        //String formattedDateTime = now.format(formatter);
        // Convert the formatted string to an integer
        //int dateTimeInt = Integer.parseInt(formattedDateTime);

        fakeData.add(new TableData(taskInteger, titles, headers, rows, total));
        taskInteger=taskInteger+1;
    }

    // Return the list of TableData objects
    return fakeData;
}


}
