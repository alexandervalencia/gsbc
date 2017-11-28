import React, { Component } from 'react'
import WeDeploy from 'wedeploy'
import Navbar from './Navbar'
import Shelf from './Shelf'
import Sorter from './Sorter'
import SortOptionsList from './utilities/SortOptionsList'
import SortUtil from './utilities/SortUtil'
import LoadingSpinner from './utilities/LoadingSpinner'
import '../styles/Bookshelf.css'

export default class Bookshelf extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addBookFormAmazonUrl: '',
      addBookFormAuthor: '',
      addBookFormCoverImg: '',
      addBookFormDatePicked: '',
      addBookFormSubtitle: '',
      addBookFormTitle: '',
      addBookFormUserImg: '',
      addBookFormUserPicked: '',
      addBookFormUserSubmitted: '',
      books: [],
      currentMember: {},
      currentUser: {},
      members: [],
      ratings: [],
      showModalAddBook: false,
      showModalSignIn: false,
      signInFormEmail: '',
      signInFormPassword: '',
      sortValue: '3',
    }

    this.handleAddBook = this.handleAddBook.bind(this)
    this.handleAddBookModalClose = this.handleAddBookModalClose.bind(this)
    this.handleAddBookModalOpen = this.handleAddBookModalOpen.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSorterChange = this.onSorterChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
  }

  componentWillMount() {
    this.fetchAppData()

    this.getCurrentUser()
    this.getCurrentMember()
  }

  onBookAddition() {
    WeDeploy.data('data-gsbc.wedeploy.io')
      .get('books')
      .then(books => this.setState({ books }))
  }

  onEmailChange(event) {
    const signInFormEmail = event.target.value

    this.setState({ signInFormEmail })
  }

  onPasswordChange(event) {
    const signInFormPassword = event.target.value

    this.setState({ signInFormPassword })
  }

  onSorterChange(event) {
    const sortValue = event.target.value
    let config

    SortOptionsList.forEach((option) => {
      if (sortValue === option.value) {
        config = option
      }
    })

    WeDeploy.data('data-gsbc.wedeploy.io')
      .get('books')
      .then((books) => {
        SortUtil(books, config)

        this.setState({ books, sortValue })
      })
  }

  onTitleChange(event) {
    const addBookFormTitle = event.target.value

    this.setState({ addBookFormTitle })
  }

  async getCurrentMember() {
    let currentMember = {}
    const currentUser = await WeDeploy.auth('auth-gsbc.wedeploy.io').currentUser
    const members = await WeDeploy.data('data-gsbc.wedeploy.io').get('members')

    if (currentUser) {
      members.forEach((member) => {
        if (currentUser.id === member.userId) {
          currentMember = member
        }
      })
    }

    this.setState({ currentMember })
  }

  async getCurrentUser() {
    const currentUser = await WeDeploy.auth('auth-gsbc.wedeploy.io').currentUser

    this.setState({ currentUser })
  }

  async fetchAppData() {
    const data = WeDeploy.data('data-gsbc.wedeploy.io')

    const books = await data.get('books')
    const members = await data.get('members')
    const ratings = await data.get('ratings')

    SortUtil(books, { dir: 'desc', type: 'datePicked' })

    this.setState({ books, members, ratings })
  }

  handleAddBook(event) {
    event.preventDefault()

    console.log(event)
  }

  handleAddBookModalClose() {
    this.setState({ showModalAddBook: false })
  }

  handleAddBookModalOpen() {
    this.setState({ showModalAddBook: true })
  }

  handleSignInModalClose() {
    this.setState({ showModalSignIn: false })
  }

  handleSignInModalOpen() {
    this.setState({ showModalSignIn: true })
  }

  handleSignIn(event) {
    event.preventDefault()

    WeDeploy.auth('https://auth-gsbc.wedeploy.io')
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((currentUser) => {
        this.setState({ currentUser })
      })
      .catch(err => console.error(err))
  }

  handleSignOut(event) {
    event.preventDefault()

    WeDeploy.auth('https://auth-gsbc.wedeploy.io')
      .signOut()
      .then(() => this.setState({ currentUser: {} }))
      .catch(err => console.error(err))
  }

  render() {
    if (!this.state.books.length > 0) {
      return <LoadingSpinner />
    }

    return (
      <div className="Bookshelf">
        <header className="navbar-header">
          <div className="row">
            <div className="col control-box">
              <Sorter
                onSorterChange={this.onSorterChange}
                value={this.state.sortValue}
              />
              <Navbar
                currentMember={this.state.currentMember}
                currentUser={this.state.currentUser}
                email={this.state.signInFormEmail}
                handleAddBook={this.handleAddBook}
                handleAddBookModalClose={this.handleAddBookModalClose}
                handleAddBookModalOpen={this.handleAddBookModalOpen}
                handleSignIn={this.handleSignIn}
                handleSignInModalClose={this.handleSignInModalClose}
                handleSignInModalOpen={this.handleSignInModalOpen}
                handleSignOut={this.handleSignOut}
                onEmailChange={this.onEmailChange}
                onPasswordChange={this.onPasswordChange}
                onTitleChange={this.onTitleChange}
                password={this.state.signInFormPassword}
                showModalAddBook={this.state.showModalAddBook}
                showModalSignIn={this.state.showModalSignIn}
              />
            </div>
          </div>
        </header>
        <Shelf
          books={this.state.books}
          currentMember={this.state.currentMember}
          currentUser={this.state.currentUser}
          members={this.state.members}
          ratings={this.state.ratings}
        />
      </div>
    )
  }
}
