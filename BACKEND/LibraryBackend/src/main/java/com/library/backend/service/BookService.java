package com.library.backend.service;

import com.library.backend.model.Book;
import java.util.List;

public interface BookService {
    Book addBook(Book book);
    List<Book> getAllBooks();
    Book getBookById(String id);
    void deleteBook(String id);
}