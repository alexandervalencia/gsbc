import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rater from 'react-rater'
import WeDeploy from 'wedeploy'
import { checkForUserRating, getUserRatingId } from './utilities/RatingsUtil'
import '../styles/Rating.css'

class Rating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      average: '',
      interactive: true,
      members: props.members,
      ratings: props.ratings,
      signedIn: false,
    }

    this.handleRating = this.handleRating.bind(this)
    this.updateAverage = this.updateAverage.bind(this)
    this.updateRatings = this.updateRatings.bind(this)
  }

  componentWillMount() {
    this.updateAverage()

    if (!this.props.currentUser) {
      this.setState({
        interactive: false,
        signedIn: false,
      })
    } else {
      this.setState({ signedIn: true })
    }
  }

  handleRating(event) {
    const data = WeDeploy.data('data-gsbc.wedeploy.io')
    const propsRatings = this.props.ratings
    const propsMember = this.props.currentMember

    if (event.type === 'click') {
      if (checkForUserRating(propsRatings, propsMember.id)) {
        const ratingId = getUserRatingId(propsRatings, propsMember.id)

        data.update(`ratings/${ratingId}`, {
          rating: event.rating,
        })
        .then(() => {
          this.updateRatings()
        })
      } else {
        data.create('ratings', {
          book: this.props.bookId,
          rating: event.rating,
          user: this.props.currentMember.id,
        })
        .then(() => {
          this.updateRatings()
        })
      }
    }

    if (event.type === 'mouseenter') {
      this.setState({ hint: event.rating })
    }
  }

  updateAverage() {
    const ratings = this.state.ratings
    const ratingsArray = []

    if (ratings.length > 0) {
      ratings.forEach((rating) => {
        ratingsArray.push(rating.rating)
      })

      const sum = ratingsArray.reduce((a, b) => a + b)

      const average = Math.round(((sum / ratings.length) * 2)) / 2

      this.setState({ average })

      WeDeploy.data('data-gsbc.wedeploy.io')
        .update(`books/${this.props.bookId}`, {
          rating: average,
        })
    }
  }

  updateRatings() {
    WeDeploy.data('data-gsbc.wedeploy.io')
    .get('ratings')
    .then((ratings) => {
      this.setState({ ratings })

      this.updateAverage()
    })
  }

  render() {
    const average = this.state.average
    let rateEncouragement = <p />

    if (!this.state.signedIn) {
      rateEncouragement = <p>Want to rate this book? Sign-in or sign-up!</p>
    } else if (average <= 0) {
      rateEncouragement = <p>No rating yet, be the first!</p>
    }

    if (average <= 0) {
      return (
        <div className="no-rating">
          <Rater
            interactive={this.state.interactive}
            onRate={this.handleRating}
            rating={0}
            total={5}
          />
          {rateEncouragement}
        </div>
      )
    }

    return (
      <div className="rating">
        <Rater
          interactive={this.state.interactive}
          onRate={this.handleRating}
          rating={average}
          total={5}
        />
        {rateEncouragement}
      </div>
    )
  }
}

Rating.propTypes = {
  bookId: PropTypes.string,
  currentMember: PropTypes.object,
  currentUser: PropTypes.object,
  members: PropTypes.array.isRequired,
  ratings: PropTypes.array,
}

export default Rating
