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

	$('#controlMenu').replaceWith(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="javascript:;" id="controlMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				${currentUser.firstName}
			</a>
			<div class="dropdown-menu" aria-labelledby="controlMenu">
				<a class="dropdown-item" data-target="#addBookModal" data-toggle="modal" href="javascript:;"><i class="fa fa-plus fa-fw"></i> Add a Book</a>
				<a class="dropdown-item" href="javascript:;"><i class="fa fa-sign-out fa-fw"></i> Sign Out</a>
			</div>
		</li>`
	);

	(function easterEgg() {
		var stuff = $('#stuff');

		stuff.hover(
			function() {
				stuff.text('Shit ')
			},
			function() {
				stuff.text('Stuff')
			}
		);
	})();



	$('.edit').html('<a href="javascript;">Edit Bookshelf</a>');
} else {
	// No user is signed in.
}
