//@ts-check
var auth = WeDeploy.auth('auth.gsbc.wedeploy.io')

var REGEX_MON = /\w{3}/g;

var REGEX_YEAR = /\d{4}/g;

function newMember() {
	auth.createUser({
			email: user.email.value,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			password: user.password.value
		})
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
	$('#greetMember').text('Hey ' + currentUser.firstName + '!');
	$('#signInButton').remove();
	$('#footerNav').append('<a onclick="signOut();" return false;><button class="btn btn-primary" type="button">Sign Out</button></a> <button class="btn btn-primary" data-target="#addBookModal" data-toggle="modal" type="button">Add a Book</button>');
} else {
	// No user is signed in.
}

var form = document.querySelector('#book');

form.addEventListener(
	'submit',
	function(e) {
		e.preventDefault();

		var values = {
			'author': form.author.value,
			'book': form.title.value,
			'datePicked': form.datePicked.value,
			'pickedBy': form.pickedBy.value
		}

		WeDeploy
			.data('data.gsbc.wedeploy.io')
			.create('books', values)
			.then(
				function(book) {
					console.log(book);
				}
			)
			.catch(
				function(err) {
					console.error(err);
				}
			);
	}
);