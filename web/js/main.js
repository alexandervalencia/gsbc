//@ts-check
var auth = WeDeploy.auth('auth.gsbc.wedeploy.io')

var REGEX_MON = /\w{3}/g;

var REGEX_YEAR = /\d{4}/g;

function newMember() {
	auth.createUser(
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
	auth.signInWithEmailAndPassword(user.email.value, user.password.value)
	.then(function() {
		alert('You are signed-in');
		user.reset();
		document.location.href = '/';
	})
	.catch(function(err) {
		alert('Sign-in failed. Chcek your email/password and try again.');
	});
}

function signOut() {
	auth.signOut()
	.then(() => {
		location.href = '/';
	});
}

var currentUser = auth.currentUser;

if (currentUser) {
	$('#greetMember').text('Hey ' + currentUser.firstName +'!');
	$('#signInButton').remove();
	$('#footerNav').append('<a onclick="signOut;" return false;><button class="btn btn-primary" type="button">Sign Out</button></a> <button class="btn btn-primary" data-target="#book" data-toggle="modal" type="button">Add a Book</button>');
} else {
	// No user is signed in.
}

function addBook() {
	WeDeploy
		.data('data.gsbc.wedeploy.io')
		.create(
			'books',
			 {
				'author': book.author.value,
				'book': book.title.value,
				'datePicked': book.date.value,
				'pickedBy': book.pickedBy.value
			}
		)
		.then(function(book) {
			console.log(book);
		});
}
