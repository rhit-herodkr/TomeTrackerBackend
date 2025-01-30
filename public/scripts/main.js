/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */

/** namespace. */
var rhit = rhit || {};

rhit.indexPageController = function() {
	document.querySelector("#alreadyRegisteredButton").onclick = (event) => {
		console.log("Redirecting to: /login.html");
		window.location.href = "http://localhost:5000/login.html";
		
	};
	console.log("index page active")
}

/**
 * The main driver of the bookViewPage. Able to add and view books
 */
rhit.bookViewPageController = function () {
	//Implementation of the viewBookTableButton, gets JSON and sends it to the populateTable function
	document.querySelector("#viewBookTableButton").onclick = async (event) => {
		const result = await rhit.bookViewPageGetBookAPI();
		rhit.populateTable(result);
	};

	//Implementation of addBookButton, takes in all of the inputs and passes them to the addBookAPI
	document.querySelector("#addBookButton").onclick = (event) => {
		const title = document.querySelector("#titleInput").value;
		const type = document.querySelector("#typeInput").value;
		const genre = document.querySelector("#genreInput").value;
		const isbn = document.querySelector("#isbnInput").value;
		const pubDate = document.querySelector("#pubDateInput").value;
		const author = document.querySelector("#AuthorInput").value;
		
		const object = {title: title, type: type, genre: genre, isbn: isbn, pubDate: pubDate, author: author};
		const jsonObject = JSON.stringify(object);
		rhit.bookViewPageAddBookAPI(jsonObject);
	}
};

rhit.bookViewPageAddBookAPI = async function (jsonObject) {
	//Call the api that is created in api.js
	const response = await fetch('http://localhost:3000/api/add-book',
		{ method: 'POST', body: jsonObject, headers: { 'Content-Type': 'application/json' } });
}

// Function to populate the books table
rhit.populateTable = function (books) {
	const tableBody = document.querySelector("#bookTable tbody"); // Select table body
	tableBody.innerHTML = ""; // Clear existing rows

	books.forEach((book, index) => {
		const row = document.createElement("tr");

		row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${book.Title.trim()}</td>
            <td>${book.Type}</td>
            <td>${book.Genre}</td>
            <td>${book.ISBN}</td>
            <td>${new Date(book.PublishedDate).toLocaleDateString()}</td>
            <td>${book.Author}</td>
        `;

		tableBody.appendChild(row);
	});
}

rhit.bookViewPageGetBookAPI = async function () {
	//Call the api that is created in api.js
	const response = await fetch('http://localhost:3000/api/get-books',
		{
			method: 'GET', headers: {
				'Content-Type':
					'application/json'
			}
		});
	return await response.json();

}

/**
 * Determines what page you are on.
 */
rhit.setControllers = function () {
	if (document.querySelector("#indexPage")) {
		console.log("You are on the indexPage");
		new rhit.indexPageController();
	}
	else if (document.querySelector("#bookViewPage")){
		console.log("You are on the bookViewPage");
		new rhit.bookViewPageController();
	}
	
}

/* Main */
/** function and class syntax examples */
rhit.main = async function () {
	console.log("Ready");

	rhit.setControllers();
};

rhit.main();
