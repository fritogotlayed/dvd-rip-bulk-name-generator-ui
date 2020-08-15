import _ from 'lodash';
// import React, { useState } from 'react';
import React from 'react';
import './ShowGrid.css'

const ShowGrid = ({ className, shows, onShowSelected }) => {
  // const [state, setState] = useState({});

  const showSelectedHandler = (id) => {
    if (onShowSelected) {
      const show = _.find(shows, { id })
      onShowSelected(show);
    }
  }
  
  return (
    <div className={className}>
      <table className="table">
        <thead>
          <tr>
            <th>Show</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shows.map((e) => (
            <tr key={e.id}>
              <td>{e.seriesName}</td>
              <td>{e.overview}</td>
              <td>
                <button className="button is-primary" onClick={() => showSelectedHandler(e.id)}>
                  <span className="icon is-small">
                    <i className="fa fa-check"></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ShowGrid;
