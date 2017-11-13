import React from 'react'
import Bookshelf from './components/Bookshelf'
import './App.css'

const App = () => {
  return (
    <div className="container">
      <header className="site-title">
        <div className="row title-row">
          <div className="col">
            <div className="text-center">
              <div className="title-back">
                <h1>Book Club</h1>
              </div>
              <div className="title-front">
                <h2 className="align-middle">Good <span id="stuff">Stuff</span></h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Bookshelf />
    </div>
  )
}

export default App
