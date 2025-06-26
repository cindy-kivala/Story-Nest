//FIND A SOLUTION TO ENSURE THE SEARCH ISNT REQUIRED IN STRICT TERMS-CASE INSENSITIVE and SYMBOLS
document.addEventListener("DOMContentLoaded", main);

//function main
let allBooks = []; //hold the full list of books

function main() {
    const form = document.getElementById("searcher");
    const input = document.getElementById("search-input");

    //listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // prevent page reload

        // get the value of the input field
        const searchTerm = input.value.trim();

        // check if the input is empty
        if (searchTerm === "") {
            alert("Please enter a book title, author, ISBN, or genre before searching.");
        } else {
            // call filterBooks function if input is not empty
            filterBooks(searchTerm); //changed to filter to stop all data from loading after search
        }
    });

    //listener for input changes
    input.addEventListener("input", (event) => {
        console.log("Typing:", event.target.value);
    });

    //Fetch all books and store them in 'allBooks"
    fetchBooks();

    //fetch books function - load full list on start
    function fetchBooks() {
        fetch("http://localhost:3000/books") // q=query
            .then(response => response.json())
            .then(data => {
                allBooks = data;
                displayBooks(allBooks); //display all books, not sure if this will remain in final product
            })
            .catch((error) => console.error("Error fetching books:", error));
    }

    //Filter books when search
    function filterBooks(searchTerm) {
        const term = searchTerm.toLowerCase().replace(/[^\w\s]/gi, ""); // remove symbols
       //case insensitivity
        const normalize = string => string.toLowerCase().replace(/[^\w\s]/gi, "");//normalize book fields
        const filteredBooks = allBooks.filter(book => {
            const titleMatch = book.title && book.title.toLowerCase().includes(term);

            const authorMatch = book.authors && book.authors.some(author =>
                author.name.toLowerCase().includes(term));

            const subjectMatch = book.subjects && book.subjects.some(subject =>
                subject.toLowerCase().includes(term)
            );
            console.log("filtering searches");

            return titleMatch || authorMatch || subjectMatch;
        });

        displayBooks(filteredBooks);
    }

    //Favorite books
    function getFavorites() {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    }
    console.log("getting favorites");

    //Saving favorites - Storing favorite IDs in local storage
    function saveFavorites(favorites) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    console.log("Saving favorites");

    //Display books function
    function displayBooks(books) {
        const bookDisplay = document.querySelector(".book-display");
        bookDisplay.innerHTML = ""; // Clear previous results

        //no books found
        if (books.length === 0) {
            bookDisplay.innerHTML = "<p>Sorry, no books found. Please try a different search term.</p>";
            return;
        }

        //Declaring favorites before forEach loop to avoid error
        const favorites = getFavorites();

        //display each book
        books.forEach((book) => {
            const bookDiv = document.createElement("div");
            bookDiv.className = "book-item";

            const isFavorite = favorites.includes(book.id);

            //get book details
            const title = book.title || "No title available";

            //get book author on basis of first match to avoid confusion and ensure clarity
            let author = "Unknown";
            if (book.authors && book.authors.length > 0) {
                author = book.authors[0].name;
            }
            console.log("author:", author);

            //subject or genre
            let subject = "General";
            if (book.subjects && book.subjects.length > 0) {
                subject = book.subjects[0];
            }
            console.log("subject:", subject);

            //get book cover image
            let img = "";
            if (book.formats && book.formats["image/jpg"]) {
                img = book.formats["image/jpg"];
                //NB: DON'T FORGET TO RESTART THE SERVER
            } else if (book.formats && book.formats["image/jpeg"]) {
                img = book.formats["image/jpeg"];
            }
            console.log("img:", img);

            const summary = book.summary || "No summary available.";

            //Update bookDiv with book details and favorite button
            bookDiv.innerHTML = `
                <h3>${title}</h3>
                <div class="tooltip">
                    <img src="${img}" alt="Book Cover" width="200" height="180">
                    <span class="tooltip-text">${summary}</span>
                </div>
                <p><strong>Author:</strong> ${author}</p>
                <p><strong>Genre:</strong> ${subject}</p>
                <button class="fav-btn" data-id="${book.id}">
                    ${isFavorite ? "★ Favorited" : "☆ Favorite"}
                </button>
            `;

            //favorite button listener
            const favBtn = bookDiv.querySelector(".fav-btn");
            favBtn.addEventListener("click", () => {
                let updated = getFavorites();
                if (updated.includes(book.id)) {
                    updated = updated.filter(id => id !== book.id);
                } else {
                    updated.push(book.id);
                }
                saveFavorites(updated);
                displayBooks(books); // re-render to reflect change
            });

            //append book
            bookDisplay.appendChild(bookDiv);
        });

        console.log("Books displayed successfully.");
        console.log("Favorites saved successfully");
    }
}
//features to add
//1. hoovr for summary box, find a way to have it only appear upon hoover
//2. favorites shelf
//3. popularity ranking