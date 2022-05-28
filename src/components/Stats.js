import React from "react";

export default function Stats({ noRolls, allTimeBest }) {
  return (
    <div className='stats-container'>
      <div className='stats'>
        <div className='stat'>
          <p className='stats-data'>{noRolls}</p>
          <p className='stats-description'>Current Rolls</p>
        </div>
        <div className='divider'></div>
        <div>
          <p className='stats-data'>{allTimeBest}</p>
          <p className='stats-description'>All Time Best</p>
        </div>
      </div>
    </div>
  );
}
