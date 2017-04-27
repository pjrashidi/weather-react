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
      return <RecentItem searchItem={searchItem} />
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
  recentSearches: PropTypes.array
}

export default RecentList
