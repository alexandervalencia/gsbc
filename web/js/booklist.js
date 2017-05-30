(function() {
	var DATA = WeDeploy.data('http://data.gsbc.wedeploy.io');

	var bookList = {
		initializer: function() {
			var instance = this;

			instance._getBookData();
		},

		_deleteBook: function(book, row) {
			var d = confirm('Are you sure you want to remove ' + book.title + ' from The Bookshelf?');

			if (d) {
				DATA.delete('books/'+ book.id);

				$(row).remove();
			}
		},

		_formatOptions: function(data) {
			var instance = this;

			var months = instance._formatMonths(data);
			var pickedBy = instance._formatPickedBy(data);
			var years = instance._formatYears(data);

			return {
				months: months,
				pickedBy: pickedBy,
				years: years
			}

		},

		_formatMonths: function(data) {
			var instance = this;

			var mon = data.datePicked.slice(0, 3);
			var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			var months = [];

			for (var i = 0; i < monthArray.length; i++) {
				if (monthArray[i] === mon) {
					months.push('<option selected>' + monthArray[i] + '</option>')
				}
				else {
					months.push('<option>' + monthArray[i] + '</options>')
				}
			}

			return months.join('\n');
		},

		_formatPickedBy: function(data) {
			var instance = this;

			var pickArray = ['Alex', 'Angela', 'Brian', 'Dan', 'John', 'Leigh', 'Kelly', 'Kelsey', 'Russell', 'Group'];
			var pickedBy = [];

			for (var i = 0; i < pickArray.length; i++) {
				if (pickArray[i] === data.pickedBy) {
					pickedBy.push('<option selected>' + pickArray[i] + '</option>')
				}
				else {
					pickedBy.push('<option>' + pickArray[i] + '</option>')
				}
			}

			return pickedBy.join('\n')
		},

		_formatYears: function(data) {
			var instance = this;

			var year = data.datePicked.slice(4, 8);
			var yearArray = ['2013', '2014', '2015', '2016', '2017']
			var years = [];

			for (var i = 0; i < yearArray.length; i++) {
				if (yearArray[i] === year) {
					years.push('<option selected>' + yearArray[i] + '</option>')
				}
				else {
					years.push('<option>' + yearArray[i] + '</options>')
				}
			}

			return years.join('\n')
		},

		_editBook: function(book, row) {
			var instance = this;

			var options = instance._formatOptions(book)

			var editBookForm = `<tr>
				<td>
					<input type="hidden" name="id" value="${book.id}">
					<input type="textarea" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineTitle" name="title" placeholder="${book.title}" rows="2" value="${book.title}">
				</td>
				<td>
					<input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineAuthor" name="author" placeholder="${book.author}" value="${book.author}">
				</td>
				<td class="inline-dates">
					<select class="form-control mb-2 mr-sm-2 mb-sm-0 inline-month" id="inlineMonth" name="monthPicked" required>
						${options.months}
					</select>
					<select class="form-control mb-2 mr-sm-2 mb-sm-0 inline-year" id="inlineYear" name="yearPicked" required>
						${options.years}
					</select>
				</td>
				<td>
					<select class="form-control mb-2 mr-sm-2 mb-sm-0" id="pickedBy" name="pickedBy" required>
						${options.pickedBy}
					</select>
				</td>
				<td>
					<button type="submit" class="btn btn-primary btn-save">Save</button>
				</td>
			</tr>`;

			$(row).replaceWith(editBookForm);

			$('#editBook').submit(
				function(event) {
					event.preventDefault();

					instance._saveBook(row);
				}
			);
		},

		_getBookData: function() {
			var instance = this;

			DATA.get('books')
				.then(
					function(books) {
						instance._renderBooks(books, instance._sortTable);
						instance._watchForChanges();
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
					var tr = td.closest('tr');

					DATA.get('books')
						.then(function(results) {
							results.forEach(function(data) {
								if (data.author === author) {
									instance._deleteBook(data, tr);
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
				'.book-edit',
				function(event) {
					event.preventDefault();

					var span = $(this).closest('span');
					var td = span.closest('td');
					var author = td.siblings('.author').text();
					var tr = td.closest('tr');

					DATA.get('books')
						.then(function(results) {
							results.forEach(function(data) {
								if (data.author === author) {
									instance._editBook(data, tr);
								}
							})
						})
					;
				}
			)
		},

		_renderBooks: function(books, cb) {
			var instance = this;

			var fragment = document.createDocumentFragment();
			var table = document.querySelector('#book-list');
			var tr;

			books.forEach(
				function(book) {
					tr = document.createElement("tr");

					tr.innerHTML = `<th scope="row">${book.title}</th>
					<td class="author">${book.author}</td>
					<td>${book.datePicked}</td>
					<td>${book.pickedBy}</td>
					<td>
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

		_saveBook: function(row) {
			var instance = this;

			var date = new Date();
			var updatedOn = date.getFullYear() + '-' + (date.getMonth() + 1 ) + '-'+ date.getDate();


			DATA.update(('books/' + editBook.id.value),
				{
					'title': editBook.title.value,
					'author': editBook.author.value,
					'datePicked': (editBook.monthPicked.value + ' ' + editBook.yearPicked.value),
					'pickedBy': editBook.pickedBy.value,
					'lastUpdatedBy': currentUser.firstName,
					'updatedOn': updatedOn
				}
			)
			.then(
				function(result) {
					$(row).remove();
				}
			)
			.catch(
				function(err) {
					console.error(err);
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
			var instance = this;

			var edit = $('.edit');

			edit.click(
				function(event) {
					event.preventDefault();

					$('.form-controls').toggleClass('hidden');
				}
			)

			instance._getBookToDelete();
			instance._getBookToEdit();
		},

		_watchForChanges: function() {
			var instance = this;

			DATA.limit(1)
				.watch('books')
				.on(
					'changes',
					function(books) {
						instance._renderBooks(books, instance._sortTable);
					}
				)
				.on(
					'fail',
					function(error) {
						console.error(error);
					}
				)
			;
		}
	}

	bookList.initializer();
})();