// The Book Model
class Book {
    constructor(title, author, numberOfPages, releaseYear) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.releaseYear = releaseYear;
    };
}

module.exports = Book