import React from 'react'
import ReactDOM from 'react-dom'
// import Test from './Test'
import Title from './Title'
import Login from './Login'
import Search from './Search'
import RecentList from './RecentList'
import Forecast from './Forecast'
import { getForecast } from './getForecast'
import { updateRecentList } from './updateRecentList'

const getRecentsInStorage = () => {
  const recentList = []
  for (let i = 0; i < 5; i += 1) {
    if (window.localStorage.getItem(i)) {
      recentList.push(window.localStorage.getItem(i))
    }
  }
  return recentList
}

// All state and functions that modify state
// are here, passed to components as props

class ClientApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      searchTerm: '',
      geocode: '',
      forecast: {},
      recentList: getRecentsInStorage()
    }
    this.setStateItem = this.setStateItem.bind(this)
    this.setGeocode = this.setGeocode.bind(this)
    this.setForecast = this.setForecast.bind(this)
    this.setRecentList = this.setRecentList.bind(this)
  }

  setStateItem (stateKey, stateValue) {
    this.setState({ [stateKey]: stateValue })
  }

  setGeocode (newGeocode) {
    this.setState({ geocode: newGeocode }, () => {
      getForecast(this.state.geocode, this.setForecast)
      updateRecentList(
        this.state.recentList,
        this.state.geocode,
        this.setRecentList
      )
    })
  }

  setForecast (newForecast) {
    this.setState({ forecast: newForecast })
  }

  setRecentList (newRecentList) {
    this.setState({ recentList: newRecentList }, () => {
      this.state.recentList.forEach((searchItem, index) => {
        const key = String(index)
        const value = searchItem
        window.localStorage.setItem(key, value)
      })
    })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        {/* <Test /> */}
        <Title />
        <Login
          username={this.state.username}
          password={this.state.password}
          setStateItem={this.setStateItem}
        />
        <Search
          searchTerm={this.state.searchTerm}
          setStateItem={this.setStateItem}
          setGeocode={this.setGeocode}
        />
        <RecentList
          recentSearches={this.state.recentList}
          setGeocode={this.setGeocode}
        />
        <Forecast forecast={this.state.forecast} />
      </div>
    )
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('app'))
