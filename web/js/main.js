function signIn(user) {
	WeDeploy
		.auth('http://auth.gsbc.wedeploy.io')
		.signInWithEmailAndPassword(user.email.value, user.password.value)
		.then(
			function(user) {
				// User is signed in.
			}
		)
		.catch(
			function(err) {
				// User is not signed in.
			}
		)
	;
}

function createNewUser() {
	WeDeploy.auth('auth.boilerplate-auth.wedeploy.io')
		.createUser(
			{
				email: signUp.email.value,
				name: signUp.name.value,
				password: signUp.password.value
			}
		)
		.then(
			function(user) {
				alert('Sign-up successfully.');
				location.href = '/';
			}
		)
		.catch(
			function() {
				alert('Sign-up failed. Try another email.');
				signUp.reset();
			}
		)
	;
}