import React from 'react'
import PropTypes from 'prop-types'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    console.log(event.target.value)
    this.props.setSearchTerm(event.target.value)
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
  setSearchTerm: PropTypes.func,
  getData: PropTypes.func,
  searchTerm: PropTypes.string
}

export default Search

// Search.js renders a search field and a submit button
// it also updates the 'searchTerm' value in state
