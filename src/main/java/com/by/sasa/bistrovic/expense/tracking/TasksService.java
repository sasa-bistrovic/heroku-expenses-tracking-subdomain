package com.by.sasa.bistrovic.expense.tracking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksService {

    @Autowired
    private TasksRepository tasksRepository;

    public void saveAllTasks(List<Tasks> tasksList) {
        // The saveAll method will save all the entities in the list
        tasksRepository.saveAll(tasksList);
    }

    public void deleteAllTasks(List<Tasks> tasksList) {
        // The saveAll method will save all the entities in the list
        tasksRepository.deleteAll(tasksList);
    }    
}
