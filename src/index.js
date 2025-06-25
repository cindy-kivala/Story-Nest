document.addEventListener("DOMContentLoaded", main);
//function main
function main() {
    const form = document.getElementById("searcher");
    const input = document.getElementById("search-input");
   //listener for form submission
   form.addEventListener("submit", (event) => {
    event.preventDefault();// prevent page relod
    // get the value of the input field
    const searchTerm = input.value.trim();

    // check if the input is empty
    if (searchTerm === "") {
        alert("Please enter a book title, author, ISBN, or genre before searching.");
    } else {
        // redirect to the search results page with the search term as a query parameter
        fetchBooks(searchTerm); //call API function if input is not empty 
    }
   });
   //listener for input changes
   input.addEventListener("input", (event) => {
    console.log("Typing:", event.target.value);
   });

   //API URL
//    const API_URL = "https://localhost:3000/books";

   //fetch books function- in response to user input
   function fetchBooks(searchInput) {
      fetch(`http://localhost:3000/books?q=${searchInput}`)//q=query
        .then((response) => response.json())
        .then((data) => {
            displayBooks(data);
        })
        .catch((error) => console.error("Error fetching books:", error));
   }
   //display books function
   function displayBooks(books) {
       const bookDisplay = document.querySelector(".book-display");
       bookDisplay.innerHTML = ""; // Clear previous results

       //no books found
       if (books.length === 0) {
           bookDisplay.innerHTML = "<p>Sorry, no books found. Please try a different search term.</p>";
           return;
       }
       //display each book
       books.forEach((book) => {
          const bookDiv = document.createElement("div");
          bookDiv.className = "book-item";
        //get book details
          let title = book.title || "No title available";

          //get book author on basis of first match to avoid confusion and ensure clarity
          let author = "Unknown";
          if (book.authors && book.authors.length > 0) { //The singular first author was throwing error
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
              img = book.formats["image/jpg"];//why is it not working? Ah, i needed to restart the server*
              //NB: DON'T FORGET TO RESTART THE SERVER
          } else if (book.formats && book.formats["image/jpeg"]) {
              img = book.formats["image/jpeg"];
          }
          console.log("img:", img);

          //update bookDiv with book details
           bookDiv.innerHTML = `
              <h3>${title}</h3>
              <img src="${img}" alt="Book Cover" width="100" height="150">
              <p><strong>Author:</strong> ${author}</p>
              <p><strong>Genre:</strong> ${subject}</p>
           `;//Experiment with book cover image size
              bookDisplay.appendChild(bookDiv);
       });
       console.log("Books displayed successfully.");
   }
}