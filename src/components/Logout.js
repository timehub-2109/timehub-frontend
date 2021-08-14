import { Redirect } from 'react-router-dom';
import Auth from './auth/Auth';

function Logout() {
  Auth.logout(() => console.log('logging out!'));
  
  return (
    <Redirect to="/" />
  );
}

export default Logout;