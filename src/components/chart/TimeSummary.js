import React from 'react';

function TimeSummary(props) {
  return (
    <div className="flex flex-col items-start">
      <h5 className='text-xs font-light -mb-1'>Total Hours</h5>
      <h5 className='text-2xl font-light'>{props.totalTime}</h5>
    </div>
  );
}

export default TimeSummary;