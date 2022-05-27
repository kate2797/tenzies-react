import React from "react";

export default function Stats({ noRolls }) {
  return (
    <div className='stats-container'>
      <div className='stats'>
        <div className='stat'>
          <p className='stats-data'>{noRolls}</p>
          <p className='stats-description'>Current Rolls</p>
        </div>
        <div>
          <p className='stats-data'>{noRolls}</p>
          <p className='stats-description'>All Time Best</p>
        </div>
      </div>
    </div>
  );
}
