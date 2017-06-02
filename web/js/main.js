//@ts-check
var AUTH = WeDeploy.auth('auth.gsbc.wedeploy.io');
var DATA = WeDeploy.data('data.gsbc.wedeploy.io');

var REGEX_MON = /\w{3}/g;

var REGEX_YEAR = /\d{4}/g;

function newMember() {
	AUTH.createUser(
		{
			email: user.email.value,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			password: user.password.value
		}
	)
	.then(
		function() {
			alert('Account sucessfully created!');
			signIn();
			user.reset();
		}
	)
	.catch(
		function() {
			alert('Sign-up failed. Try again.');
			user.reset();
		}
	);
}

function signIn() {
	AUTH.signInWithEmailAndPassword(
		user.email.value,
		user.password.value
		)
	.then(
		function() {
			alert('You are signed-in');
			user.reset();
			document.location.href = '/';
		}
	)
	.catch(
		function(err) {
			alert('Sign-in failed. Chcek your email/password and try again.');
		}
	);
}

function signOut() {
	AUTH.signOut()
		.then(
			function() {
				document.location.href = '/';
			}
		);
}

var currentUser = AUTH.currentUser;

if (currentUser) {
	$('#greetMember').text('Hey ' + currentUser.firstName + '!');

	$('#signInButton').remove();

	$('#footerNav').append(
		`<button class="btn btn-primary" data-target="#addBookModal" data-toggle="modal" type="button">Add a Book</button>
		<a onclick="signOut();" return false;>
			<button class="btn btn-primary" type="button">Sign Out</button>
		</a>`
	);

	$('.edit').html('<a href="javascript;">Edit Bookshelf</a>');
	
/*
	var stuff = $('#stuff');

	stuff.hover(
		function() {
			stuff.text('Shit')
		},
		function() {
			stuff.text('Stuff')
		}
	);
*/
	
} else {
	// No user is signed in.
}

function addBook() {
	var date = new Date();
	var createdOn = date.getFullYear() + '-' + (date.getMonth() + 1 ) + '-'+ date.getDate();

	DATA.create(
		'books',
		{
			'author': book.author.value,
			'title': book.title.value,
			'datePicked': (book.monthPicked.value + ' ' + book.yearPicked.value),
			'pickedBy': book.pickedBy.value,
			'submittedBy': currentUser.firstName,
			'createdOn': createdOn
		}
	)
	.then(
		function(results) {
			book.reset();
			$('#addBookModalClose').click();
		}
	)
	.catch(
		function(err) {
			console.error(err);
		}
	);
}
