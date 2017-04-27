import React from 'react'
import PropTypes from 'prop-types'

class RecentList extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    let recentSearches
    recentSearchList = this.props.recentSearches.map((searchItem) => {
      return <div>{searchItem}</div>
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
