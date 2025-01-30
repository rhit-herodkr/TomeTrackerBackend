/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */

/** namespace. */
var rhit = rhit || {};

function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.indexPageController = function () {

	document.querySelector("#viewBookTableButton").onclick = async (event) => {
		const result = await rhit.indexPageGetBookAPI();
		console.log(result);
		//const books = JSON.parse(result);
		rhit.populateTable(result);
	};
};

// Function to populate the table
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

rhit.indexPageGetBookAPI = async function () {
	const response = await fetch('http://localhost:3000/api/get-books',
		{
			method: 'GET', headers: {
				'Content-Type':
					'application/json'
			}
		});
	//Print json out on the website
	//console.log(await response.text());
	// const toReturn = await response.text();
	// return (toReturn)
	return await response.json();

}

/**
 * Determines what page you are on.
 */
rhit.setControllers = function () {
	console.log("Set controllers called")
	if (document.querySelector("#indexPage")) {
		console.log("You are on the indexPage");
		new rhit.indexPageController();
	}
}

/* Main */
/** function and class syntax examples */
rhit.main = async function () {
	console.log("Ready");

	// //The call to the get-book api, formatted as a json object
	// const response = await fetch('http://localhost:3000/api/get-books',
	// 	{method:'GET',headers:{'Content-Type':
	// 	'application/json'}});
	// //Print json out on the website
	// console.log(await response.text());


	rhit.setControllers();

};

rhit.main();
