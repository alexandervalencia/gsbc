(function() {
	var DATA = 	WeDeploy.data('http://data.gsbc.wedeploy.io');

	var bookList = {
		initializer: function() {
			var instance = this;

			instance._getBookData();
		},

		renderUI: function() {

		},

		_deleteBook: function(book) {
			console.log(book.id);
			var d = confirm('Are you sure you want to remove ' + book.title + ' from The Bookshelf?');
			if (d) {
				DATA.delete('books/'+ book.id);
			}
		},

		_editBook: function(book) {
			var instance = this;

			$(document).on(
				'click',
				'.book-edit',
				function(event) {
					event.preventDefault();

					var span = $(this).closest('span');
					var td = span.closest('td');
					var author = td.siblings('.author').text();

					DATA.get('books')
						.then(
							function(results) {
								results.forEach(
									function(data) {
										if (data.author === author) {
											console.log(`It's a match! ${data.author} === ${instance.author}`)
										}
									}
								)
							}
						)
					;
				}
			);
		},

		_formatBooks: function(books, cb) {
			var instance = this;

			var fragment = document.createDocumentFragment();
			var table = document.querySelector('#book-list');

			books.forEach(
				function(book) {
					let tr = document.createElement("tr");
					tr.innerHTML = `<th scope="row">${book.title}</th>
					<td class="author">${book.author}</td>
					<td>${book.datePicked}</td>
					<td>${book.pickedBy}
						<span class="form-controls hidden">
							<a href="javascript;"><i class="fa fa-minus-square book-delete" aria-hidden="true"></i></a>
							<a href="javascript;"> <i class="fa fa-pencil-square-o book-edit" aria-hidden="true"></i></a>
						</span>
					</td>`;

					fragment.appendChild(tr);
				}
			);

			table.appendChild(fragment);

			instance._toggleControls();

			cb();
		},

		_getBookData: function() {
			var instance = this;

			DATA.get('books')
				.then(
					function(books) {
						instance._formatBooks(books, instance._sortTable);
					}
				)
				.catch(
					function(error) {
						console.error(error);
					}
				)
			;
		},

		_getBookToDelete: function(book) {
			var instance = this;

			$(document).on(
				'click',
				'.book-delete',
				function(event) {
					event.preventDefault();

					var span = $(this).closest('span');
					var td = span.closest('td');
					var author = td.siblings('.author').text();


					DATA.get('books')
						.then(function(results) {
							results.forEach(function(data) {
								if (data.author === author) {
									instance._deleteBook(data);
								}
							})
						})
					;
				}
			)
		},

		_getBookToEdit: function(book) {
			var instance = this;

			$(document).on(
				'click',
				'.book-delete',
				function(event) {
					event.preventDefault();

					var span = $(this).closest('span');
					var td = span.closest('td');
					var author = td.siblings('.author').text();


					DATA.get('books')
						.then(function(results) {
							results.forEach(function(data) {
								if (data.author === author) {
									instance._editBook(data);
								}
							})
						})
					;
				}
			)
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
			var instance = this;

			var edit = $('.edit');

			edit.click(
				(event) => {
					event.preventDefault();

					$('.form-controls').toggleClass('hidden');
				}
			)

			instance._getBookToDelete();
			instance._getBookToEdit();
		}
	}

	bookList.initializer();
})();