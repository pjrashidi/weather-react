import React from 'react'
import PropTypes from 'prop-types'

class RecentItem extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (
      <div>
        {this.props.searchItem}
      </div>
    )
  }
}

RecentItem.propTypes = {
  searchItem: PropTypes.string
}

export default RecentItem
