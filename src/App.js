// import _ from 'lodash';
import React, { useState } from 'react';
import './App.css';
import SearchBox from './Components/SearchBox';
import ShowGrid from './Components/ShowGrid';
import EpisodeArea from './Components/EpisodeArea';

function App() {
  const [state, setState] = useState({
    shows: [],
    selectedShow: null,
    episodes: [],
  });

  const makeRequest = (part) => {
    const { origin } = window.location;
    const opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // body
    };

    return fetch(`${origin}/${part}`, opts)
      .then((resp) => resp.json())
  };

  const onSearch = (term) => {
    return makeRequest(`api/search?t=${term}`)
      .then((data) => {
        setState(s => Object.assign({}, s, { shows: data, selectedShow: null, episodes: [] }));
      })
  }

  const onShowSelected = (show) => {
    console.log(show)
    setState(s => Object.assign({}, s, { selectedShow: show }))
    return makeRequest(`api/episodesForShow/${show.id}`)
      .then((data) => {
        setState(s => Object.assign({}, s, { episodes: data }));
      });
  };

  const showsGrid = !state.selectedShow && state.shows.length > 0 ? (<ShowGrid shows={state.shows} onShowSelected={onShowSelected} ></ShowGrid>) : null;
  const episodeArea = state.selectedShow && state.episodes.length > 0 ? (<EpisodeArea episodes={state.episodes} show={state.selectedShow} ></EpisodeArea>) : null;
  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="field">
            <SearchBox onSearch={onSearch}></SearchBox>
          </div>
          {showsGrid}
          {episodeArea}
        </div>
      </div>
    </div>
  );
}

export default App;
