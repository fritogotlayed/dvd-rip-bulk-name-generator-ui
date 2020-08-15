import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import format from 'string-template';

import './ShowGrid.css'

const EpisodeArea = ({ className, show, episodes }) => {
  const [state, setState] = useState({
    workingFormat: localStorage.getItem('episodeFormat') || '',
    format: localStorage.getItem('episodeFormat') || '{show}.s{season}e{episode}.{title}',
    output: '',
  });

  const buttonClickHandler = () => {
    const format = state.workingFormat
    localStorage.setItem('episodeFormat', format);
    setState(s => _.merge({}, s, { format }))
  }

  useEffect(() => {
    let output = '';
    let currentSeason = -1;
    if (show && episodes) {
      const sorted = _.sortBy(episodes, ['season', 'episodeNumber'])
      _.forEach(sorted, (episode) => {
        if (currentSeason !== episode.season) {
          currentSeason = episode.season;
          output += `\nSeason ${episode.season}\n`;
        }

        const season = '0' + episode.season;
        const episodeNum = '0' + episode.episodeNumber;

        output += format(`${state.format}\n`, {
          show: show.seriesName,
          season: episode.season,
          episode: episode.episodeNumber,
          seasonPadded: season.slice(season.length - 2),
          episodePadded: episodeNum.slice(episodeNum.length - 2),
          title: episode.episodeName,
        })
      });
      setState(s => _.merge({}, s, { output }))
    } else {
      setState(s => _.merge({}, s, { output }))
    }
  }, [episodes, show, state.format]);

  const body = (
    <div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Format</label>
        </div>
        <div className="field-body">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                defaultValue={state.workingFormat}
                placeholder='{show}.s{season}e{episode}.{title}'
                onKeyUp={(event) => {
                  if (event.key === 'Enter') buttonClickHandler();
                }}
                onChange={(event) => {
                  const workingFormat = event.target.value;
                  setState(s => _.merge({}, s, { workingFormat }))
                }}
                // data-tooltip="{show}, {season}, {seasonPadded}, {episode}, {episodePadded}, {title}"
              />
            </div>
            <div className="control">
              <button type="button" className="button is-primary" onClick={() => buttonClickHandler()}><i className="fa fa-check" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <textarea className="textarea" rows="20" value={state.output} readonly>
        </textarea>
      </div>
    </div>
  );
  
  return (
    <div className={className}>
      {body}
    </div>
  )
};

export default EpisodeArea;
