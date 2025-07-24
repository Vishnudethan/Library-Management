package com.library.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "books")
public class Book {

    @Id
    private String id;

    private String title;

    private String author;

    private LocalDate publicationDate;

    private String isbn;

    private String genre;

    private int rating;

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
