WeDeploy
	.auth('http://auth.gsbc.wedeploy.io')
	.signInWithEmailAndPassword("user@domain.com", "password")
	.then(function(user) {
		// User is signed in.
	})
	.catch(function(err) {
		// User is not signed in.
	});