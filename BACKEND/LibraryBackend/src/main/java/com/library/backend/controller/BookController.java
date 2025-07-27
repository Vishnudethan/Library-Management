//package com.library.backend.controller;
//
//import com.library.backend.model.Book;
//import com.library.backend.service.BookService;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("api/books")
//@CrossOrigin("*")
//@Validated
//public class BookController {
//
//    @Autowired
//    private BookService bookService;
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    @PostMapping
//    public Book addBook(@RequestBody @Valid Book book) {
//        return bookService.addBook(book);
//    }
//
//    @GetMapping
//    public List<Book> getAllBooks() {
//        return bookService.getAllBooks();
//    }
//
//    @GetMapping("/{id}")
//    public Book getBookById(@PathVariable String id) {
//        return bookService.getBookById(id);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteBook(@PathVariable String id) {
//        bookService.deleteBook(id);
//    }
//
//    @GetMapping("/google")
//    public String getBookDetailsFromGoogle(@RequestParam(required = false) String isbn,
//                                           @RequestParam(required = false) String title) {
//        String query = "";
//
//        if (isbn != null && !isbn.isBlank()) {
//            query = "isbn:" + isbn;
//        } else if (title != null && !title.isBlank()) {
//            query = "intitle:" + title;
//        } else {
//            throw new IllegalArgumentException("Provide either ISBN or Title");
//        }
//
//        String url = "https://www.googleapis.com/books/v1/volumes?q=" + query;
//        return restTemplate.getForObject(url, String.class);
//    }
//}
package com.library.backend.controller;

import com.library.backend.model.Book;
import com.library.backend.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("api/books")
@CrossOrigin("*")
@Validated
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private RestTemplate restTemplate;

    //  Add Book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody @Valid Book book) {
        Book createdBook = bookService.addBook(book);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    // Get All Books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    //  Get Book By ID ,not given(front end passes location.state)
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Book book = bookService.getBookById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    //  Delete Book
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
    }

    // ✅Google Books API
    @GetMapping("/google")
    public ResponseEntity<String> getBookDetailsFromGoogle(@RequestParam(required = false) String isbn,
                                                           @RequestParam(required = false) String title) {
        String query = "";

        if (isbn != null && !isbn.isBlank()) {
            query = "isbn:" + isbn;
        } else if (title != null && !title.isBlank()) {
            query = "intitle:" + title;
        } else {
            return new ResponseEntity<>("Provide either ISBN or Title", HttpStatus.BAD_REQUEST);
        }

        String url = "https://www.googleapis.com/books/v1/volumes?q=" + query;
        String result = restTemplate.getForObject(url, String.class);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}



