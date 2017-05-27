(function() {
	var bookList = {
		initializer: function() {
			this._getBookData();
		},

		renderUI: function() {

		},

		_formatBooks: function(books, cb) {
			var fragment = document.createDocumentFragment();
			var table = document.querySelector('#book-list');

			books.forEach(
				function(book) {
					let tr = document.createElement("tr");
					tr.innerHTML = `<th scope="row">${book.title}</th>
					<td>${book.author}</td>
					<td>${book.datePicked}</td>
					<td>${book.pickedBy}
						<span class="form-controls hidden">
							<a href="javascript;"><i class="fa fa-minus-square book-remove" aria-hidden="true"></i></a>
							 <a href="javascript;"><i class="fa fa-pencil-square-o book-edit" aria-hidden="true"></i></a>
						</span>
					</td>`;

					fragment.appendChild(tr);
				}
			);

			table.appendChild(fragment);

			this._toggleControls();

			cb();
		},

		_getBookData: function() {
			var instance = this;

			WeDeploy
				.data('data.gsbc.wedeploy.io')
				.get('books')
				.then(
					function(books) {
						console.log(books);
						instance._formatBooks(books, instance._sortTable);
					}
				)
				.catch(
					function(error) {
						console.error(error);
					}
				);
		},

		_sortTable: function() {
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
		},

		_toggleControls: function() {
			var edit = $('.edit');

			edit.click(
				(event) =>{
					event.preventDefault();

					$('.form-controls').toggleClass('hidden');
				}
			)
		}
	}

	bookList.initializer();
})();