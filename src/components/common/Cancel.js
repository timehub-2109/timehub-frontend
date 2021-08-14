import React from 'react';
import { useHistory } from 'react-router-dom';

function Cancel() {
  const history = useHistory();

  async function handleGoBack(e) {
    e.preventDefault();
    history.goBack();
  }

  return (
    <button 
      className='mt-1 bg-gray-200 hover:text-red-800 text-center rounded-md p-3 w-full'
      onClick={(e) => handleGoBack(e)} >
      Cancel
    </button>
    
  );
}

export default Cancel;