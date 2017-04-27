import React from 'react'
import ReactDOM from 'react-dom'
// import Test from './Test'
import Title from './Title'
import Search from './Search'
import RecentList from './RecentList'
import Forecast from './Forecast'
import { getForecast } from './getForecast'
import { updateRecentList } from './updateRecentList'

class ClientApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      geocode: '',
      forecast: {},
      recentList: []
    }
    this.setSearchTerm = this.setSearchTerm.bind(this)
    this.setGeocode = this.setGeocode.bind(this)
    this.setForecast = this.setForecast.bind(this)
    this.setRecentList = this.setRecentList.bind(this)
  }
  setSearchTerm (newSearchTerm) {
    this.setState({searchTerm: newSearchTerm})
  }
  setGeocode (newGeocode) {
    this.setState(
      {geocode: newGeocode},
      () => {
        getForecast(this.state.geocode, this.setForecast)
        updateRecentList(this.state.recentList, this.state.geocode, this.setRecentList)
      }
    )
  }
  setForecast (newForecast) {
    this.setState({forecast: newForecast})
  }
  setRecentList (newRecentList) {
    this.setState({recentList: newRecentList})
  }
  render () {
    console.log(this.state)
    return (
      <div>
        {/* <Test /> */}
        <Title />
        <Search
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          setGeocode={this.setGeocode}
        />
        <RecentList recentSearches={this.state.recentList} />
        <Forecast forecast={this.state.forecast} />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
