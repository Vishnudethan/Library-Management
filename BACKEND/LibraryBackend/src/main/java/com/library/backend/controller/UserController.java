package com.library.backend.controller;

import com.library.backend.model.User;
import com.library.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
   // @PostMapping("/login")
//    public User loginUser(@RequestBody User user) {
//        User existingUser = userRepository.findByEmail(user.getEmail());
//        if (existingUser == null) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        if (!existingUser.getPassword().equals(user.getPassword())) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        return existingUser;
//    }
    @PostMapping("/login")
public User loginUser(@RequestBody User user) {
    User existingUser = userRepository.findByEmail(user.getEmail());
  
    if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    return existingUser;
}

}
