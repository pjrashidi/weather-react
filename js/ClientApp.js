import React from 'react'
import ReactDOM from 'react-dom'
// import Test from './Test'
import Title from './Title'
import Search from './Search'
import RecentList from './RecentList'
import Forecast from './Forecast'
import { getForecast } from './getForecast'

class ClientApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      coordinates: '',
      forecast: {},
      recentList: [
        'new york',
        'phoenix',
        'denver'
      ]
    }
    this.setSearchTerm = this.setSearchTerm.bind(this)
    this.setCoordinates = this.setCoordinates.bind(this)
    this.setForecast = this.setForecast.bind(this)
    this.setRecentList = this.setRecentList.bind(this)
  }
  setSearchTerm (newSearchTerm) {
    this.setState({searchTerm: newSearchTerm})
  }
  setCoordinates (newCoordinates) {
    this.setState(
      {coordinates: newCoordinates},
      () => getForecast(this.state.coordinates, this.setForecast)
    )
  }
  setForecast (newForecast) {
    this.setState({forecast: newForecast})
  }
  setRecentList (newRecentList) {
    this.setState({recentList: newRecentList})
  }
  render () {
    return (
      <div>
        {/* <Test /> */}
        <Title />
        <Search
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          setCoordinates={this.setCoordinates}
        />
        <RecentList recentSearches={this.state.recentList} />
        <Forecast forecast={this.state.forecast} />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
