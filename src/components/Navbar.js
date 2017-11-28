import React from 'react'
import PropTypes from 'prop-types'
import AddBookModal from './utilities/AddBookModal'
import SignInModal from './utilities/SignInModal'

import '../styles/Navbar.css'

const Navbar = ({ currentMember, currentUser, email, handleAddBook, handleAddBookModalClose, handleAddBookModalOpen, handleSignIn, handleSignInModalClose, handleSignInModalOpen, handleSignOut, onEmailChange, onPasswordChange, onTitleChange, password, showModalAddBook, showModalSignIn }) => {
  if (currentUser) {
    return (
      <div className="Navbar">
        <button className="btn btn-primary" onClick={handleAddBookModalOpen}>Add Book</button>
        <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
        <AddBookModal
          currentMember={currentMember}
          className="Modal"
          handleAddBook={handleAddBook}
          handleModalClose={handleAddBookModalClose}
          onTitleChange={onTitleChange}
          showModal={showModalAddBook}
        />
      </div>
    )
  }

  return (
    <div className="Navbar">
      <button className="btn btn-primary" onClick={handleSignInModalOpen}>Sign In</button>
      <SignInModal
        email={email}
        handleModalClose={handleSignInModalClose}
        handleSignIn={handleSignIn}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        password={password}
        showModal={showModalSignIn}
      />
    </div>
  )
}

Navbar.propTypes = {
  currentMember: PropTypes.object,
  currentUser: PropTypes.object,
  email: PropTypes.string,
  handleAddBook: PropTypes.func,
  handleAddBookModalClose: PropTypes.func,
  handleAddBookModalOpen: PropTypes.func,
  handleSignInModalClose: PropTypes.func,
  handleSignInModalOpen: PropTypes.func,
  handleSignIn: PropTypes.func,
  handleSignOut: PropTypes.func,
  onEmailChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onTitleChange: PropTypes.func,
  password: PropTypes.string,
  showModalAddBook: PropTypes.bool,
  showModalSignIn: PropTypes.bool,
}

export default Navbar
