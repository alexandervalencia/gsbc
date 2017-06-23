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