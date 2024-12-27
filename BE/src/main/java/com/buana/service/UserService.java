package com.buana.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.buana.dto.auth.LoginDto;
import com.buana.dto.auth.RegisterDto;
import com.buana.dto.google.GoogleDTO;
import com.buana.model.User;
import com.buana.repository.UserRepository;

import jakarta.validation.ValidationException;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GoogleService googleService;

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

    public User signInGoogle(GoogleDTO.Request req) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        System.out.println("Request: " + req);
        GoogleDTO.Response res = googleService.getGoogleAccount(req.token());
        String email = res != null ? res.emailAddresses().get(0).value() : null;
        if(email == null || email.isEmpty()) throw new ValidationException("User not found");

        System.out.println("Email: " + email);

        User user = getUserByEmail(email);
        if (user == null) {
            throw new ValidationException("User not found");
        }

        return user;
    }

}
