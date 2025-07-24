package com.library.backend.repositories;


import com.library.backend.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    // Add custom methods if needed, like findByEmail
    User findByEmail(String email);
}