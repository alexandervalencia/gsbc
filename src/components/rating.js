import React, { Component } from 'react';

class Rating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      average: '',
      members: props.members,
      ratings: props.ratings
    }
  }
  componentWillMount() {
    const ratings = this.state.ratings;
    const ratingsArray = [];

    if (ratings.length > 0) {
      ratings.forEach(rating => {
        ratingsArray.push(rating.rating)
      })

      const sum = ratingsArray.reduce((a, b) => a + b);

      const average = Math.round(((sum / ratings.length) * 2)) / 2;

      this.setState({average})
    }
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
