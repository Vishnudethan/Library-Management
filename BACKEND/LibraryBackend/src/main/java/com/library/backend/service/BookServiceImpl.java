package com.library.backend.service;

import com.library.backend.model.Book;
import com.library.backend.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Override
    public Book addBook(Book book) {
        book.setId(sequenceGeneratorService.generateSequence(Book.SEQUENCE_NAME));
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @Override
    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }

	
}

