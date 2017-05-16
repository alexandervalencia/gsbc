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

var currentUser = WeDeploy.auth('http://auth.gsbc.wedeploy.io').currentUser;

if (currentUser) {
	$('#signedInOnly').text('Welcome ' + currentUser.name)
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