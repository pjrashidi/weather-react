import React from 'react'
import RecentItem from './RecentItem.js'
import PropTypes from 'prop-types'

class RecentList extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    let recentSearchList
    recentSearchList = this.props.recentSearches.map((searchItem) => {
      return (
        <RecentItem
          searchItem={searchItem}
          setGeocode={this.props.setGeocode}
        />
      )
    })
    return (
      <div>
        <h2>Recent Searches</h2>
        {recentSearchList}
      </div>
    )
  }
}

RecentList.propTypes = {
  recentSearches: PropTypes.array,
  setGeocode: PropTypes.func
}

export default RecentList
