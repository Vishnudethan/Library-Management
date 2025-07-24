package com.library.backend.repositories;

import com.library.backend.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String> {
    Book findByIsbn(String isbn);
}