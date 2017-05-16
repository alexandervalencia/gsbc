function signIn() {
	WeDeploy
		.auth('http://auth.gsbc.wedeploy.io')
		.signInWithEmailAndPassword(signIn.email.value, signIn.password.value)
		.then(
			function(signIn) {
				alert('You are signed-in');
				location.href = '/';
			}
		)
		.catch(
			function(err) {
				console.log('User could not signed in.');
			}
		)
	;
}

$('#signedInOnly').text('Sign in to unlock me')

var currentUser = WeDeploy.auth('http://auth.gsbc.wedeploy.io').currentUser;

if (currentUser) {
	$('#signedInOnly').append('<button class="btn btn-primary" data-target="#addBook" data-toggle="modal" type="button">Add a Book</button>')
} else {
	// No user is signed in.
}

$(document).ready(
	function() {
		$("#book-list").tablesorter(
			{
				theme: 'bootstrap',
				sortList: [[2,0]]
			}
		);
	}
);