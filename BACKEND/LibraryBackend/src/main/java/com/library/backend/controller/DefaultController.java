package com.library.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.backend.model.Book;
import com.library.backend.service.BookService;


@RestController
public class DefaultController {
	
	@Autowired
	private BookService bookService;

    @GetMapping("/")
    public String home() {
        return " Book Management API Running! Visit /api/books to see all books. & visit /summary for getting book title and id";
    }
    ///For getting id and book title in BE...no specific methods created
    @GetMapping("/summary")
    public ResponseEntity<List<Map<String, String>>> getBookSummaries() {
        List<Book> books = bookService.getAllBooks();

        List<Map<String, String>> summaries = books.stream()
            .map(book -> {
                Map<String, String> summary = new HashMap<>();
                summary.put("id", book.getId());
                summary.put("title", book.getTitle());
                return summary;
            })
            .toList();

        return new ResponseEntity<>(summaries, HttpStatus.OK);
    }
}
