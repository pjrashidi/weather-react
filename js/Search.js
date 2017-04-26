import React from 'react'
import PropTypes from 'prop-types'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.props.changeCoordinates(event.target.value)
  }
  handleSubmit (event) {
    this.props.getData(event)
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            id='searchInput'
            value={this.props.coordinates}
            onChange={this.handleChange}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  changeCoordinates: PropTypes.func,
  getData: PropTypes.func,
  coordinates: PropTypes.string
}

export default Search
