import React, { Component } from 'react';

class Rating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      average: props.average,
      members: props.members,
      ratings: props.ratings
    }
    console.log(props);
  }

  render() {
    return (
      <div>
        Rating
      </div>
    )
  }
}

export default Rating;
