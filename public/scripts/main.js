/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */

/** namespace. */
var rhit = rhit || {};

rhit.indexPage_Controller = function () {
	document.querySelector("#memberButton").onclick = (event) => {
		window.location.href = "http://localhost:5000/member-login.html";
	};
	document.querySelector("#employeeButton").onclick = (event) => {
		//window.location.href = "http://localhost:5000/employee-login.html";
	};
}

rhit.memberLoginPage_Controller = function () {
	document.querySelector("#loginButton").onclick = async (event) => {
		const loginPassword = document.querySelector("#passwordInput").value;
		const loginEmail = document.querySelector("#emailInput").value;

		const object = { loginEmail: loginEmail, loginPassword: loginPassword };
		const jsonObject = JSON.stringify(object);


		var success = await rhit.memberLoginPage_LoginMemberAPI(jsonObject);
		if (success) {
			console.log("Success!")
			window.location.href = "http://www.localhost:5000/bookView.html";
		} else {
			console.log("Login failed. Please check your credentials.");

		}
	};

	document.querySelector("#registerButton").onclick = async (event) => {
		window.location.href = "http://www.localhost:5000/register-member.html";
	};
}

rhit.memberLoginPage_LoginMemberAPI = async function (jsonObject) {
	//Call the api that is created in api.js
	const response = await fetch('http://localhost:3000/api/login-member',
		{ method: 'POST', body: jsonObject, headers: { 'Content-Type': 'application/json' } });

	//Response status means 200 is success
	if (response.status == 200) {
		return true;
	}
	else {
		return false;
	}
}

rhit.memberRegisterPage_Controller = function () {
	document.querySelector("#registerButton").onclick = async (event) => {
		const nameValue = document.querySelector("#nameInput").value;
		const addressValue = document.querySelector("#addressInput").value;
		// const dobValue = document.querySelector("#dobInput").value;
		const dobValue = document.querySelector("#dobInput").value;
		const loginEmail = document.querySelector("#emailInput").value;
		const loginPassword = document.querySelector("#passwordInput").value;

		const object = {
			nameValue: nameValue,
			addressValue: addressValue,
			dobValue: dobValue,
			loginEmail: loginEmail,
			loginPassword: loginPassword
		};
		console.log(object);

		const jsonObject = JSON.stringify(object);

		var success = await rhit.memberRegisterPage_RegisterMemberAPI(jsonObject);
		if (success) {
			alert("Registration success! Please login now.");
			window.location.href = "http://www.localhost:5000/member-login.html";
		} else {
			console.log("Registration failed.");

		}
	}
}

rhit.memberRegisterPage_RegisterMemberAPI = async function (jsonObject) {
	const response = await fetch('http://localhost:3000/api/register-member',
		{ method: 'POST', body: jsonObject, headers: { 'Content-Type': 'application/json' } });
	if (response.status == 200) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * The main driver of the bookViewPage. Able to add and view books
 */
rhit.bookViewPage_Controller = function () {
	//Implementation of the viewBookTableButton, gets JSON and sends it to the populateTable function
	document.querySelector("#viewBookTableButton").onclick = async (event) => {
		const result = await rhit.bookViewPage_GetBookAPI();
		rhit.bookViewPage_PopulateTable(result);
	};

	//Implementation of addBookButton, takes in all of the inputs and passes them to the addBookAPI
	document.querySelector("#addBookButton").onclick = (event) => {
		const title = document.querySelector("#titleInput").value;
		const type = document.querySelector("#typeInput").value;
		const genre = document.querySelector("#genreInput").value;
		const isbn = document.querySelector("#isbnInput").value;
		const pubDate = document.querySelector("#pubDateInput").value;
		const author = document.querySelector("#AuthorInput").value;

		const object = { title: title, type: type, genre: genre, isbn: isbn, pubDate: pubDate, author: author };
		const jsonObject = JSON.stringify(object);
		rhit.bookViewPage_AddBookAPI(jsonObject);
	}
};

rhit.bookViewPage_AddBookAPI = async function (jsonObject) {
	//Call the api that is created in api.js
	const response = await fetch('http://localhost:3000/api/add-book',
		{ method: 'POST', body: jsonObject, headers: { 'Content-Type': 'application/json' } });
}

// Function to populate the books table
rhit.bookViewPage_PopulateTable = function (books) {
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

rhit.bookViewPage_GetBookAPI = async function () {
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
		new rhit.indexPage_Controller();
	}
	else if (document.querySelector("#memberLoginPage")) {
		console.log("You are on the memberLoginPage");
		new rhit.memberLoginPage_Controller();
	}
	else if (document.querySelector("#memberRegisterPage")) {
		console.log("You are on the memberRegisterPage");
		new rhit.memberRegisterPage_Controller();
	}
	else if (document.querySelector("#bookViewPage")) {
		console.log("You are on the bookViewPage");
		new rhit.bookViewPage_Controller();
	}

}

/* Main */
/** function and class syntax examples */
rhit.main = async function () {
	console.log("Ready");

	rhit.setControllers();
};

rhit.main();
