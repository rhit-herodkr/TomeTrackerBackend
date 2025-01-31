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
		window.location.href = "http://localhost:5000/employee-login.html";
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

rhit.employeeLoginPage_Controller = function () {
	document.querySelector("#loginButton").onclick = async (event) => {
		const loginPassword = document.querySelector("#passwordInput").value;
		const loginEmail = document.querySelector("#emailInput").value;

		const object = { loginEmail: loginEmail, loginPassword: loginPassword };
		const jsonObject = JSON.stringify(object);


		var success = await rhit.employeeLoginPage_LoginEmployeeAPI(jsonObject);
		if (success === 1) {
			window.location.href = "http://www.localhost:5000/head-librarian-view.html";
		} else if (success === 0) {
			console.log("Login as normalEmployee");
			//window.location.href = "http://www.localhost:5000/bookView.html";
		}
		else {
			console.log("Login failed.");
		}
	}
}

rhit.employeeLoginPage_LoginEmployeeAPI = async function (jsonObject) {
	const response = await fetch('http://localhost:3000/api/login-employee',
		{ method: 'POST', body: jsonObject, headers: { 'Content-Type': 'application/json' } });

	console.log(response)

	// Check if response status is 200 (success)
	if (response.status === 200) {
		const data = await response.json();
		console.log('isHeadLibrarian:', data.isHeadLibrarian);
		return data.isHeadLibrarian;
	} else {
		console.error('Login failed with status:', response.status);
		return;
	}
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

rhit.headLibrarianPage_Controller = function () {
	document.querySelector("#viewEmployeeTableButton").onclick = async (event) => {
		const result = await rhit.headLibrarianPage_GetEmployeeAPI();
		rhit.headLibrarianPage_PopulateTable(result);
	};

	document.querySelector("#clearEmployeeTableButton").onclick = async (event) => {
		rhit.headLibrarianPage_ClearTable();
	};

	document.querySelector("#addEmployeeButton").onclick = async (event) => {
		const Name = document.querySelector("#nameInput").value;
		const Address = document.querySelector("#addressInput").value;
		const DOB = document.querySelector("#dobInput").value;
		const Email = document.querySelector("#emailInput").value;
		const Password = document.querySelector("#passwordInput").value;

		const object = { Name: Name, Address: Address, DOB: DOB, Email: Email, Password: Password };
		const jsonObject = JSON.stringify(object);

		var success = await rhit.headLibrarianPage_AddEmployeeAPI(jsonObject);
		if (success) {
			alert("Employee added successfully! Click View Employee Table to update it!");
		} else {
			console.log("Add Employee failed.");

		}
	}
}

rhit.headLibrarianPage_GetEmployeeAPI = async function () {
	const response = await fetch('http://localhost:3000/api/get-employees',
		{
			method: 'GET', headers: {
				'Content-Type':
					'application/json'
			}
		});
	return await response.json();
}

rhit.headLibrarianPage_ClearTable = function () {
	const tableBody = document.querySelector("#employeeTable tbody"); // Select table body
	tableBody.innerHTML = ""; // Clear existing rows
}

rhit.headLibrarianPage_AddEmployeeAPI = async function (jsonObject) {
	//Call the api that is created in api.js
	const response = await fetch('http://localhost:3000/api/add-employee',
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
		rhit.bookViewPage_PopulateBookTable(result);
	};

	document.querySelector("#clearBookTableButton").onclick = async (event) => {
		rhit.bookViewPage_ClearBookTable();
	};

	//Implementation of addBookButton, takes in all of the inputs and passes them to the addBookAPI
	document.querySelector("#addBookButton").onclick = async (event) => {
		const title = document.querySelector("#titleInput").value;
		const type = document.querySelector("#typeInput").value;
		const genre = document.querySelector("#genreInput").value;
		const isbn = document.querySelector("#isbnInput").value;
		const pubDate = document.querySelector("#pubDateInput").value;
		const author = document.querySelector("#AuthorInput").value;

		const object = { title: title, type: type, genre: genre, isbn: isbn, pubDate: pubDate, author: author };
		const jsonObject = JSON.stringify(object);


		var success = await rhit.bookViewPage_AddBookAPI(jsonObject);
		if (success) {
			alert("Book added successfully! Click View Book Table to update it!");
		} else {
			console.log("Add book failed.");

		}
	}

	document.querySelector("#reviewBookButton").onclick = async (event) => {

		const memberID = document.querySelector("#memberIDInput").value;
		const bookID = document.querySelector("#bookIDInput").value;
		const desc = document.querySelector("#descriptionInput").value;
		const stars = document.querySelector("#starsInput").value;

		// Create an object with the form data
		const object = {
			memberID: memberID,
			bookID: bookID,
			desc: desc,
			stars: stars
		};

		// Convert the object to a JSON string
		const jsonObject = JSON.stringify(object);
		var success = await rhit.bookViewPage_AddReviewAPI(jsonObject);
		if (success) {
			alert("Review added successfully! Click View Review Table to update it!");
		} else {
			console.log("Add review failed.");

		}
	};

	document.querySelector("#viewReviewTableButton").onclick = async (event) => {
		const result = await rhit.bookViewPage_GetReviewAPI();
		rhit.bookViewPage_PopulateReviewTable(result);
	};

	document.querySelector("#clearReviewTableButton").onclick = async (event) => {
		rhit.bookViewPage_ClearReviewTable();
	};
}

rhit.bookViewPage_AddReviewAPI = async function (jsonObject) {
	const response = await fetch('http://localhost:3000/api/add-review',
		{ method: 'POST', body: jsonObject, headers: { 'Content-Type': 'application/json' } });
	if (response.status == 200) {
		return true;
	}
	else {
		return false;
	}
}

rhit.bookViewPage_AddBookAPI = async function (jsonObject) {
	//Call the api that is created in api.js
	const response = await fetch('http://localhost:3000/api/add-book',
		{ method: 'POST', body: jsonObject, headers: { 'Content-Type': 'application/json' } });
	if (response.status == 200) {
		return true;
	}
	else {
		return false;
	}
}
rhit.headLibrarianPage_PopulateTable = function (employees) {
	const tableBody = document.querySelector("#employeeTable tbody"); // Select table body
	tableBody.innerHTML = ""; // Clear existing rows

	employees.forEach((employee, index) => {
		const row = document.createElement("tr");

		row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${employee.PersonID}</td>
      <td>${employee.Name.trim()}</td>
      <td>${employee.Address}</td>
      <td>${new Date(employee.DOB).toLocaleDateString()}</td>
      <td>${employee.Email}</td>
      <td>${employee.Password}</td>
      <td>${employee.EmployeeID}</td>
      <td>${employee.isHeadLibrarian === 1 ? 'Yes' : 'No'}</td>
    `;
		tableBody.appendChild(row);
	});
}
// Function to populate the books table
rhit.bookViewPage_PopulateBookTable = function (books) {
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

rhit.bookViewPage_PopulateReviewTable = function (reviews){
	const tableBody = document.querySelector("#reviewTable tbody"); // Select table body
	tableBody.innerHTML = ""; // Clear existing rows
	
	reviews.forEach((review, index) => {
		const row = document.createElement("tr");
	
		row.innerHTML = `
			<th scope="row">${index + 1}</th>
			<td>${review.MemberID}</td>
			<td>${review.BookID}</td>
			<td>${review.Description.trim()}</td>
			<td>${review.Stars}</td>
		`;
	
		tableBody.appendChild(row);
	});
	
}

rhit.bookViewPage_ClearReviewTable = function (){
	const tableBody = document.querySelector("#reviewTable tbody"); // Select table body
	tableBody.innerHTML = ""; // Clear existing rows
}

rhit.bookViewPage_ClearBookTable = function () {
	const tableBody = document.querySelector("#bookTable tbody"); // Select table body
	tableBody.innerHTML = ""; // Clear existing rows
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

rhit.bookViewPage_GetReviewAPI = async function (){
	//Call the api that is created in api.js
	const response = await fetch('http://localhost:3000/api/get-reviews',
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
	else if (document.querySelector("#employeeLoginPage")) {
		console.log("You are on the employeeLoginPage");
		new rhit.employeeLoginPage_Controller();
	}
	else if (document.querySelector("#headLibrarianPage")) {
		console.log("You are on the headLibrarianPage");
		new rhit.headLibrarianPage_Controller();
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
