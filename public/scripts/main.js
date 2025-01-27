/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */

/** namespace. */
var rhit = rhit || {};

/** globals */
rhit.variableName = "";

/** function and class syntax examples */
rhit.functionName = function () {
	/** function body */
};

rhit.ClassName = class {
	constructor() {

	}

	methodName() {

	}
}

/* Main */
/** function and class syntax examples */
rhit.main = async function () {
	console.log("Ready");

	//The call to the get-book api, formatted as a json object
	const response = await fetch('http://localhost:3000/api/get-books',
		{method:'GET',headers:{'Content-Type':
		'application/json'}});
	console.log(await response.text());
};

rhit.main();
