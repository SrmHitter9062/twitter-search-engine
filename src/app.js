import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home'
import MovieHome from './components/layout/MovieHome'

class App extends Component {
  render(){
    return (
      <div>
        <Home />
      </div>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('root'))

class MovieHomePage extends Component {
  render(){
    return (
      <div>
        <MovieHome />
      </div>
    )
  }
}

ReactDOM.render(<MovieHomePage />,document.getElementById('movie_root'))
