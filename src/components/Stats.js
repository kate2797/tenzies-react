import React from "react";

export default function Stats({ noRolls }) {
  return (
    <div className='stats'>
      <p>
        {noRolls} {noRolls === 1 ? "roll" : "rolls"} so far
      </p>
    </div>
  );
}
