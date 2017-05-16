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