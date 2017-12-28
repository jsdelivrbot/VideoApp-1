import _ from 'lodash';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import App from './components/app';
import reducers from './reducers';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
//
// import Navbar from 'bootstrap3/dist/css/bootstrap.css'
// import Navbar from 'bootstrap3/dist/css/bootstrap-theme.css'

const createStoreWithMiddleware = applyMiddleware()(createStore);
const API_KEY = 'AIzaSyDTYTJ3a4cYTmjdQWZrF2J7VNamrzlbcBE';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key:API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
  });
}
    render () {
      //uses lodash method debounce to throttle how often the search function is rendered
      // runs the video search function from youtube upon a change in state in the search bar,
      // passes videoSearch lodash throttle functionality into onSearchTermChange
      const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

      return <div>
       <h1 className="App-title">Welcome to the Zinck Video Search Tool</h1>
      <br />
        <SearchBar onSearchTermChange={videoSearch} />

        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>;
 }
}

ReactDOM.render(
    <App />, document.querySelector('.container'));
