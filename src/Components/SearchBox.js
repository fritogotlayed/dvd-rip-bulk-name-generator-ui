import _ from 'lodash';
import React, { useState } from 'react';
import './SearchBox.css';

function SearchBox({ className, onSearch }) {
  const [state, setState] = useState({
    term: '',
  });

  const buttonClickHandler = () => {
    if (onSearch) onSearch(state.term);
  }

  const body = (
    <div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Search</label>
        </div>
        <div className="field-body">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                defaultValue={state.term}
                placeholder='Show Name'
                onKeyUp={(event) => {
                  if (event.key === 'Enter') buttonClickHandler();
                }}
                onChange={(event) => {
                  const term = event.target.value;
                  setState(s => _.merge({}, s, { term }))
                }}
              />
            </div>
            <div className="control">
              <button type="button" className="button is-primary" onClick={() => buttonClickHandler()}><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (<div className={className}>
    {body}
  </div>)
};

export default SearchBox;