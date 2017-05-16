function createNewUser() {
	WeDeploy.auth('auth.gsbc.wedeploy.io')
		.createUser(
			{
				email: newMember.email.value,
				firstName: newMember.firstName.value,
				lastName: newMember.lastName.value,
				password: newMember.password.value
			}
		)
		.then(
			function(user) {
				alert('You have successfully been signed up!');
				location.href = '/';
			}
		)
		.catch(
			function() {
				alert('Sign-up failed. Try again.');
				newMember.reset();
			}
		)
	;
}