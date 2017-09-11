import React, { Component } from 'react';
import Bookshelf from './components/bookshelf';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header className="title-header">
          <div className="row title-row">
            <div className="col">
              <div className="text-center title">
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
    );
  }
}

export default App;
