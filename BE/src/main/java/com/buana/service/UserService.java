package com.buana.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buana.model.User;
import com.buana.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        if (id == null)
            throw new RuntimeException("Id must be grather than 0");
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getUserByName (String name){
        return userRepository.findByNameInSchema(name);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(String id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }

    public void deleteUser (String id){
        userRepository.deleteById(id);
    }

}
