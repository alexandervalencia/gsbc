var auth = WeDeploy.auth('auth.gsbc.wedeploy.io')

var REGEX_MON = /\w{3}/g;

var REGEX_YEAR = /\d{4}/g;

function createNewMember() {
	auth.createUser(
		{
			email: newMember.email.value,
			firstName: newMember.firstName.value,
			lastName: newMember.lastName.value,
			password: newMember.password.value
		}
	)
	.then(
		function(user) {
			alert('Account sucessfully created!');
			signIn();
			newMember.reset();
		}
	)
	.catch(
		function() {
			alert('Sign-up failed. Try again.');
			newMember.reset();
		}
	);
}

function signIn() {
	auth.signInWithEmailAndPassword(signIn.email.value, signIn.password.value)
	.then(
		function(signIn) {
			alert('You are signed-in');
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
	auth.signOut()
	.then(() => {
		location.href = '/';
	});
}

var currentUser = auth.currentUser;

if (currentUser) {
	$('#signedInOnly').text('Welcome ' + currentUser.firstName);
	$('#signedInOnly').append('<button class="btn btn-primary" data-target="#addBook" data-toggle="modal" type="button">Add a Book</button>');
} else {
	// No user is signed in.
}

function addBook() {
	WeDeploy
		.data('http://data.gsbc.wedeploy.io')
		.create(
			'books',
			 {
				'author': addBook.author.value,
				'book': addBook.title.value,
				'datePicked': addBook.date.value,
				'pickedBy': addBook.pickedBy.value
			}
		)
		.then(function(book) {
			console.log(book);
		});
}

$(document).ready(
	function() {
		$.tablesorter.addParser(
			{
				format: function(str) {
					var mon = str.match(REGEX_MON);
					var year = str.match(REGEX_YEAR);

					mon = getMonthFromString(mon);

					str = '01/' + mon + '/' + year;
					return Date.parse(str);
				},
				id: 'mon-yyyy',
				is: function() {
					return false;
				},
				parsed: false,
				type: 'numeric'
			}
		);

		function getMonthFromString (mon) {
			return new Date(Date.parse(mon + ' 1, 2017')).getMonth() + 1;
		}

		$('table').tablesorter(
				{
				headers: {
					2: {
						sorter: 'mon-yyyy',
						sortInitialOrder: 'desc'
					}
				},
				theme: 'bootstrap'
			}
		);

		$('table').trigger('update');

		$('table').trigger('sorton', [[[2, 1]]]);

	}
);