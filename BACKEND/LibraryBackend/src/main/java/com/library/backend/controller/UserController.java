package com.library.backend.controller;

import com.library.backend.model.User;
import com.library.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//For Spring Boot 3+
import jakarta.validation.Valid;





@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
        // Optional: Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }
        return userRepository.save(user);
    }
}
