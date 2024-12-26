package com.buana.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.buana.dto.auth.LoginDto;
import com.buana.dto.auth.RegisterDto;
import com.buana.model.User;
import com.buana.repository.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    public boolean register(RegisterDto req) {
        try {
            User user = new User();
            user.setName(req.name());
            user.setEmail(req.email());
            user.setPassword(passwordEncoder.encode(req.password()));
            user.setRole("user");
            user.setIsDeleted(false);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public User login (LoginDto req) {
        User user = userRepository.findByEmailInSchema(req.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (!user.getPassword().equals(req.password())) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }

	public User getUserByEmail(String email) {
		return userRepository.findByEmailInSchema(email).orElseThrow(() -> new RuntimeException("User not found"));
	}

}
