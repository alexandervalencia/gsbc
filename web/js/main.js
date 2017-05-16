var REGEX_MON = /\w{3}/g;
var REGEX_YEAR = /\d{4}/g;

function signIn() {
	WeDeploy
		.auth('http://auth.gsbc.wedeploy.io')
		.signInWithEmailAndPassword("alex.valencia@me.com", "gsbFZJ685")
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

$('#signedInOnly').text('Sign in to unlock me');

var currentUser = WeDeploy.auth('http://auth.gsbc.wedeploy.io').currentUser;

if (currentUser) {
	$('#signedInOnly').append('<button class="btn btn-primary" data-target="#addBook" data-toggle="modal" type="button">Add a Book</button>');
} else {
	// No user is signed in.
}

$(document).ready(
	function() {
		$.tablesorter.addParser(
			{
				id: 'mon-yyyy',
				is: function() {
					return false;
				},
				format: function(str) {
					var mon = str.match(REGEX_MON);
					var year = str.match(REGEX_YEAR);

					mon = getMonthFromString(mon);

					str = '01/' + mon + '/' + year;
					return Date.parse(str);
				},
				parsed: false,
				type: 'numeric'
			}
		);

		function getMonthFromString (mon){
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
				theme: 'bootstrap',
			}
		);
	}
);