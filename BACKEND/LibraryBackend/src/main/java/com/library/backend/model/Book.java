package com.library.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Document(collection = "books")
public class Book {

    @Id
    private String id;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be under 100 characters")
    private String title;

    @NotBlank(message = "Author is required")
    @Size(max = 50, message = "Author must be under 50 characters")
    private String author;

    @NotNull(message = "Publication date is required")
    private LocalDate publicationDate;

    @NotBlank(message = "ISBN is required")
    private String isbn;

    @NotBlank(message = "Genre is required")
    private String genre;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private int rating;

    public static final String SEQUENCE_NAME = "books_sequence";

    public Book() {}

    public Book(String title, String author, LocalDate publicationDate,
                String isbn, String genre, int rating) {
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
        this.isbn = isbn;
        this.genre = genre;
        this.rating = rating;
    }

    // Getters and setters

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }

    public void setAuthor(String author) { this.author = author; }

    public LocalDate getPublicationDate() { return publicationDate; }

    public void setPublicationDate(LocalDate publicationDate) { this.publicationDate = publicationDate; }

    public String getIsbn() { return isbn; }

    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getGenre() { return genre; }

    public void setGenre(String genre) { this.genre = genre; }

    public int getRating() { return rating; }

    public void setRating(int rating) { this.rating = rating; }
}

