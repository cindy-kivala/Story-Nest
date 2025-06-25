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
   const API_URL = "https://gutendex.com/books";

   //fetch books function- in response to user input
   function fetchBooks(searchInput) {
      fetch(`http://localhost:3000/books?q=${searchInput}`)//q=query
        .then((response) => response.json())
        .then((data) => {
            displayBooks(data);
        })
        .catch((error) => console.error("Error fetching books:", error));
      
   }
}