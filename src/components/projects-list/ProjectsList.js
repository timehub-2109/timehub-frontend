import React from 'react';
import ListRow from './ListRow';

function ProjectsList(props) {
  let projectRows = props.projects.map(project => <ListRow key={project.name} {...project} />);

  return (
    <div className="flex flex-col">
      <div className="w-full gap-2 flex text-xs text-center items-center bg-gray-200 font-semibold rounded-sm text-gray-700 px-2">
        <div className={`px-2 h-3.5 bg-gray-400 my-1 rounded-sm`} />
        <h5 className="w-1/4">Project Name</h5>
        <h5 className="w-1/4">Data Source</h5>
        <h5 className="w-1/4">Total Hours</h5>
        <h5 className="w-1/4">Due Date</h5>
      </div>
      {projectRows}
    </div>
  );
}

export default ProjectsList;