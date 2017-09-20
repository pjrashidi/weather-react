import React from 'react'
import PropTypes from 'prop-types'
import { codeAddress } from './geocoder'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.props.setStateItem(event.target.id, event.target.value)
  }
  handleSubmit (event) {
    event.preventDefault()
    codeAddress(this.props.searchTerm, this.props.setGeocode)
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            id='searchTerm'
            value={this.props.searchTerm}
            onChange={this.handleChange}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  setStateItem: PropTypes.func,
  setGeocode: PropTypes.func,
  searchTerm: PropTypes.string
}

export default Search

// Search.js renders a search field and a submit button
// it also updates the 'searchTerm' value in state
