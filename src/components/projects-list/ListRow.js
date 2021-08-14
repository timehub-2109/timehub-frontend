import React from 'react';

function ProjectListRow(props) {
  return (
    <li className='w-full gap-2 flex text-center text-sm items-center border-b py-3.5 px-2'>
      <div className={`px-2 h-3.5 rounded-sm`}
           style={{backgroundColor: props.color}} />
      <p className="w-1/4 font-semibold">{props.name}</p>
      <p className="w-1/4 font-light">{props.source}</p>
      <p className="w-1/4">{props.duration}</p>
      <p className="w-1/4 font-light">{props.due_date}</p>
    </li>
  ); 
}

export default ProjectListRow;