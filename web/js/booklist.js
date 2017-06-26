//@ts-check
(function() {
	var AMAZON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.305 10.271v.456c0 .821.019 1.504-.394 2.234-.334.594-.867.958-1.458.958-.809 0-1.282-.616-1.282-1.528.001-1.794 1.611-2.12 3.134-2.12zm10.695-5.271v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-10.695 3.31v.274c-1.222.136-2.818.227-3.961.73-1.32.57-2.247 1.732-2.247 3.442 0 2.189 1.38 3.283 3.154 3.283 1.498 0 2.317-.353 3.473-1.531.384.554.508.823 1.21 1.404.155.085.363.081.502-.045.419-.374 1.184-1.038 1.615-1.399.171-.139.142-.368.006-.56-.384-.532-.795-.965-.795-1.952v-3.282c0-1.391.097-2.668-.928-3.625-.807-.776-2.147-1.049-3.172-1.049-2.004 0-4.241.748-4.711 3.226-.05.263.143.402.315.44l2.041.222c.191-.01.33-.198.366-.388.175-.853.89-1.265 1.693-1.265.434 0 .927.16 1.183.546.296.434.256 1.027.256 1.529zm4.497 8.879c-1.832.981-3.823 1.454-5.635 1.454-2.684 0-5.284-.929-7.387-2.471-.185-.135-.321.103-.167.277 1.949 2.218 4.523 3.551 7.383 3.551 2.04 0 4.41-.809 6.044-2.33.271-.251.039-.629-.238-.481zm1.594-.96c-.182-.224-1.741-.417-2.693.252-.147.103-.121.245.041.225.536-.064 1.73-.208 1.942.065.213.272-.236 1.395-.437 1.896-.061.151.07.213.207.098.892-.747 1.122-2.311.94-2.536z"/></svg>`;
	var DATA = WeDeploy.data('http://data.gsbc.wedeploy.io');
	var REGEX_MON = /\w{3}/g;
	var REGEX_YEAR = /\d{4}/g;

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
					'amazonUrl': book.amazonUrl.value,
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
					PickList._removePicker(newBook.pickedBy);
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
			tr.innerHTML = `<th class="title" scope="row">
					<div class="book-title-wrapper">
						<span class="book-title">${book.title}</span>
						<span class="amazon"><a href="${book.amazonUrl}">${AMAZON_SVG}</a></span>
					</div>
				</th>
				<td class="rating"></td>
				<td class="author">${book.author}</td>
				<td class="datePicked">${book.datePicked}</td>
				<td class="pickedBy">
					${book.pickedBy}
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
					<div class="row">
						<label for="inlineTitle" class="col-sm-2 col-form-label">Book Title</label>
						<input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineTitle" name="title" placeholder="${book.title}" rows="2" value="${book.title}">
					</div>
					<div class="row">
						<label for="inlineAmazonUrl" class="col-sm-2 col-form-label">Amazon Link</label>
						<input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineAmazonUrl" name="title" placeholder="${book.amazonUrl}" rows="2" value="${book.amazonUrl}">
					</div>
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
			$('table').trigger('update');
		},

		_renderBookshelf: function(books) {
			var instance = this;

			var fragment = document.createDocumentFragment();

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
			tr.innerHTML = `<th scope="row">
					<div class="book-title-wrapper">
						<span class="book-title">${book.title.value}</span>
						<span class="amazon"><a href="${book.amazonUrl.value}">${AMAZON_SVG}</a></span>
					</div>
				</th>
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
					'amazonUrl': editBook.amazonUrl.value,
					'author': editBook.author.value,
					'datePicked': (editBook.monthPicked.value + ' ' + editBook.yearPicked.value),
					'lastUpdatedBy': currentUser.firstName,
					'pickedBy': editBook.pickedBy.value,
					'title': editBook.title.value,
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
			function getMonthFromString(mon) {
				return new Date(Date.parse(mon + ' 1, 2017')).getMonth() + 1;
			}

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

			$('table').tablesorter(
				{
					theme: "bootstrap",
					headers: {
						3: {
							sorter: 'mon-yyyy',
							sortInitialOrder: 'desc'
						}
					}
				}
			);

			$('table').trigger('sorton', [[[3, 1]]]);
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

		_addPickersToAddBookModal: function(pickers) {
			var instance = this;

			var fragment = document.createDocumentFragment();
			var pickedBy = $('#pickedBy');
			var picklist = [];

			pickers.sort();

			pickers.forEach(function(picker) {
				var option = document.createElement('option');

				option.innerHTML = picker.firstName;

				$(fragment).prepend(option);
			});

			$(pickedBy).append(fragment);
		},

		_checkAvailablePicks: function() {
			var instance = this;

			DATA.get('members')
				.then(function(members) {
					var checkList = [];

					members.forEach(function(member) {
						if (member.pickAvailable) {
							checkList.push(member.firstName);
						}
					});

					if (checkList.length === 0) {
						members.forEach(function(member) {
							DATA.update('members/' + member.id, {
								"pickAvailable": true
							}).then(function() {
								instance._renderPickList();
							});
						});
					}
				})
				.catch(function(error) {
					console.error(error);
				});
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
					function(members) {
						var picklist = []
						members.forEach(
							function(member) {
								if (member.pickAvailable) {
									picklist.push(member.firstName);
								}
							}
						);

						instance._addPickersToAddBookModal(members);

						callback(picklist);
					}
				)
				.catch(
					function(err) {
						console.error(err);
					}
				)
			;
		},

		_getPickerId: function(picker, callback) {
			DATA.get('members')
				.then(function(members) {
					members.forEach(
						function(member) {
							if (picker === member.firstName) {
								callback(member.id);
							}
						}
					)
				})
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

		_removePicker: function(picker) {
			var instance = this;

			instance._getPickerId(
				picker,
				function(id) {
					DATA.update(
						'members/' + id,
						{
							'pickAvailable': false,
						}
					)
					.then(
						function(member) {
							instance._checkAvailablePicks();
							instance._renderPickList();
						}
					)
					.catch(
						function(err) {
							console.error(err);
						}
					);
				}
			)
		},

		_renderPickList: function() {
			var instance = this;

			instance._getPickList(
				function(picklist) {
					picklist.sort();

					if (picklist.length > 1) {
						picklist = picklist.join(', ');
					}
					else if (picklist.length < 1) {
						instance._checkAvailablePicks();
					}
					else {
						picklist = picklist.join('');
					}

					$('#pickAvailable').text(picklist);
				}
			);
		},
	};

	PickList.initializer();
	BookList.initializer();
})();