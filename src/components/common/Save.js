import { Link } from 'react-router-dom';

function Save(props) {
  return (
      <Link to={props.url} className='bg-blue-200 text-blue-400 text-center rounded-md p-3 w-full'>
        Save
      </Link>
  );
  
}

export default Save;