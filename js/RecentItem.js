import React from 'react'
import PropTypes from 'prop-types'
import { codeAddress } from './geocoder'

class RecentItem extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    codeAddress(this.props.searchItem, this.props.setGeocode)
  }

  render () {
    return (
      <button onClick={this.handleClick}>
        {this.props.searchItem}
      </button>
    )
  }
}

RecentItem.propTypes = {
  searchItem: PropTypes.string,
  setGeocode: PropTypes.func
}

export default RecentItem
