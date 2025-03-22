package com.by.sasa.bistrovic.expense.tracking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupsService {

    @Autowired
    private GroupsRepository groupsRepository;

    public void saveAllGroups(List<Groups> groupsList) {
        // The saveAll method will save all the entities in the list
        groupsRepository.saveAll(groupsList);
    }

    public void deleteAllGroups(List<Groups> groupsList) {
        // The saveAll method will save all the entities in the list
        groupsRepository.deleteAll(groupsList);
    }    
}
