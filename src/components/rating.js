import React, { Component } from 'react';

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      average: '',
      members: props.members,
      ratings: ''
    }
  }
  componentWillMount() {
    WeDeploy.data('data-gsbc.wedeploy.io')
      .auth('')
      .get('ratings')
      .then(ratings => this.setState({ ratings }))
      .catch(error => console.error(error));
  }
  render() {
    return (
      <div className="rating">
        {this.state.average}
      </div>
    )
  }
}

export default Rating;
