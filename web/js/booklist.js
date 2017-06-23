//@ts-check
(function() {
	var DATA = WeDeploy.data('http://data.gsbc.wedeploy.io');

	var BookList = {
		initializer: function() {
			var instance = this;

			instance.table = document.querySelector('#book-list');

			instance._renderUI();
			instance._bindUI();
		},

		_renderUI: function() {
			var instance = this;

			DATA.get('books')
				.then(
					function(books) {
						instance.masterBookshelf = books;
						instance._renderBookshelf(books);
					}
				)
				.catch(
					function(err) {
						console.error(err);
					}
				);
		},

		_bindUI: function() {
			var instance = this;

			$('#addBook').on(
				'click',
				function(event) {
					event.preventDefault();
					instance._addBook();
				}
			)
		},

		_addBook: function() {
			var instance = this;

			var date = new Date();
			var createdOn = date.getFullYear() + '-' + (date.getMonth() + 1 ) + '-'+ date.getDate();

			DATA.create(
				'books',
				{
					'author': book.author.value,
					'title': book.title.value,
					'datePicked': (book.monthPicked.value + ' ' + book.yearPicked.value),
					'pickedBy': book.pickedBy.value,
					'submittedBy': currentUser.firstName,
					'createdOn': createdOn
				}
			)
			.then(
				function(newBook) {
					book.reset();
					instance._prependBook(newBook);
					PickList._refreshPickList(newBook.pickedBy);
					$('#addBookModalClose').click();
				}
			)
			.catch(
				function(err) {
					console.error(err);
				}
			);
		},

		_createBookRow: function(book) {
			var tr = document.createElement("tr");

			tr.id = book.id;
			tr.innerHTML = `<th scope="row">${book.title}</th>
				<td class="author">${book.author}</td>
				<td>${book.datePicked}</td>
				<td>${book.pickedBy}</td>
				<td>
					<span class="form-controls hidden">
						<a href="javascript;"><i class="fa fa-minus-square book-delete" aria-hidden="true"></i></a>
						<a href="javascript;"> <i class="fa fa-pencil-square-o book-edit" aria-hidden="true"></i></a>
					</span>
				</td>`

			return tr
		},

		_createYearArray: function() {
			var instance = this;

			var end = new Date().getFullYear();
			var start = 2013;
			var yearArray = []

			var i = start;

			for (i; i <= end; i++) {
				yearArray.push(i);
			}

			return yearArray;
		},

		_deleteBook: function(book, row) {
			var d = confirm(`Are you sure you want to remove ${book.title} from The Bookshelf?`);

			if (d) {
				DATA.delete('books/'+ book.id);

				$(row).remove();
			}
		},

		_editBook: function(book, row) {
			var instance = this;

			var options = instance._formatOptions(book)

			var editBookForm = `<tr id="${book.id}">
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
					<button class="btn btn-primary btn-save" id="cancel">Cancel</button>
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

			var yearSelected = data.datePicked.slice(4, 8);
			var yearArray = instance._createYearArray();

			var years = yearArray.map(
				function(year, index) {
					if (yearArray[index] === yearSelected) {
						return `<option selected>${year}</option>`;
					}
					else {
						return `<option>${year}</options>`;
					}
				}
			)

			return years.join('\n')
		},

		_getBookToDelete: function(book) {
			var instance = this;

			$(document).on(
				'click',
				'.book-delete',
				function(event) {
					event.preventDefault();

					var td = $(this).closest('span').closest('td');;
					var author = td.siblings('.author').text();
					var tr = td.closest('tr');

					DATA.get('books')
						.then(function(results) {
							results.forEach(function(data) {
								if (data.author === author) {
									instance._deleteBook(data, tr);
								}
							})
						}
					);
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

					var td = $(this).closest('span').closest('td');
					var author = td.siblings('.author').text();
					var tr = td.closest('tr');

					DATA.get('books')
						.then(function(results) {
							results.forEach(function(data) {
								if (data.author === author) {
									instance._editBook(data, tr);
								}
							})
						}
					);
				}
			)
		},

		_prependBook: function(book) {
			var instance = this;

			instance.table.prepend(instance._createBookRow(book));

			$('table').trigger('sortReset');
		},

		_renderBookshelf: function(books) {
			var instance = this;

			var fragment = document.createDocumentFragment();
			var tr;

			books.forEach(
				function(book) {
					var row = instance._createBookRow(book);

					fragment.appendChild(row);
				}
			);

			instance.table.appendChild(fragment);

			instance._toggleControls();

			instance._sortTable();
		},

		_renderSavedBookRow: function(book) {
			var instance = this;

			var tr = document.createElement("tr");

			tr.id = book.id;
			tr.innerHTML = `<th scope="row">${book.title.value}</th>
				<td class="author">${book.author.value}</td>
				<td>${book.monthPicked.value} ${book.yearPicked.value}</td>
				<td>${book.pickedBy.value}</td>
				<td>
					<span class="form-controls">
						<a href="javascript;"><i class="fa fa-minus-square book-delete" aria-hidden="true"></i></a>
						<a href="javascript;"> <i class="fa fa-pencil-square-o book-edit" aria-hidden="true"></i></a>
					</span>
				</td>`

			return tr
		},

		_saveBook: function(row) {
			var instance = this;

			var date = new Date();
			var updatedOn = `${date.getFullYear()}-${(date.getMonth() + 1 )}-${date.getDate()}::${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

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
				function() {
					var bookRow = instance._renderSavedBookRow(editBook)
					var toBeReplaced = $('#' + editBook.id.value);

					$(toBeReplaced).replaceWith(bookRow);
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

			var edit = $('.edit-bookshelf');

			edit.click(
				function(event) {
					event.preventDefault();

					$('.form-controls').toggleClass('hidden');
				}
			)

			instance._getBookToDelete();
			instance._getBookToEdit();
		}
	};

	var PickList = {
		initializer: function() {
			var instance = this;

			instance._renderPickList();
		},

		_formatPickList: function(array) {
			var index = array.indexOf('Group');

			if (index > -1) {
				array.splice(index, 1);
			}

			index = array.indexOf('Russell');

			if (index > -1) {
				array.splice(index, 1);
			}

			return array
		},

		_getPickList: function(callback) {
			var instance = this;

			DATA.get('members')
				.then(
					function(lists) {
						instance.masterPickList = lists[0].masterPickList.sort();
						instance.pickAvailable = instance._formatPickList(lists[0].pickAvailable.sort());

						callback(instance.pickAvailable);
					}
				)
				.catch(
					function(err) {
						console.error(err);
					}
				)
			;
		},

		_refreshAvailableList: function(picker) {
			var instance = this;

			var availableList = instance.pickAvailable;

			var index = availableList.indexOf(picker);

			if (index > -1) {
				availableList.splice(index, 1);
			}

			if (availableList.length == 0) {
				return instance._resetAvailablelist();
			}
			else {
				return availableList;
			}
		},

		_refreshPickList: function(picker) {
			var instance = this;

			instance.pickAvailable = instance._refreshAvailableList(picker);

			DATA.update(
				'members',
				{
					'pickAvailable': instance.pickAvailable,
				}
			)
			.then(
				function() {
					instance._renderPickList();
				}
			)
			.catch(
				function(err) {
					console.error(err);
				}
			);
		},

		_renderPickList: function() {
			var instance = this;

			instance._getPickList(
				function(pickers) {
					pickers = pickers.join(', ')

					$('#pickAvailable').text(pickers);
				}
			);
		},
	};

	PickList.initializer();
	BookList.initializer();
})();