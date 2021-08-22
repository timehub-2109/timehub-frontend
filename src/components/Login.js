import React from 'react';
import { withRouter } from "react-router";
import Auth from "./auth/Auth";
import NonAuthNav from './common/NonAuthNav';

class Login extends React.Component {
  async handleSampleUser(e) {
    try {
      await Auth.login({ email: 'sddoherty4@gmail.com', password: 'foobar1' });
      this.props.history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  }

  async handleLogin(e) {
    e.preventDefault();

    let userInfo = {};
    e.target.querySelectorAll('input').forEach(input => userInfo[input.name] = input.value);

    try {
      await Auth.login(userInfo);
      this.props.history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  }

  handleSignUp(e) {
    e.preventDefault();
    this.props.history.push("/signup");
  }

  render() {
    return (
      <div>
        <NonAuthNav />
        <div className="pt-12 flex flex-col w-screen h-screen bg-gray-700" >
          <div className="m-4 rounded-lg w-full mx-auto flex flex-col justify-center items-center bg-gray-700">
            <img className='h-36'
              src={process.env.PUBLIC_URL + '/images/logos/timehub_color_graphic.svg'}
              alt="A time tracker logo" />
            <h1 className='font-bold text-5xl text-white'>Login</h1>
          </div>
          <div className='shadow-2xl mx-auto items-stretch rounded-xl max-w-lg p-8 w-10/12 text-center flex bg-white flex-col items-center'>
            <p className='text-sm font-light mt-2'>If you haven't created an account, click 'sign up' below.</p>
            <p className='text-sm font-light'>Otherwise, enter your information and click 'login'.</p>

            <form onSubmit={(e) => this.handleLogin(e)}
                  className="flex flex-col text-left mt-5">
              <input name="email" type="email" placeholder="Email" className='mt-2 px-2 py-1 text-sm border border-green-400'></input>
              <input name="password" type="password" placeholder="Password" className='mt-4 px-2 py-1 text-sm border border-green-400'></input>
              <button type="submit" className='mt-8 hover:bg-green-500 hover:text-green-800 text-lg w-full py-2 rounded-lg bg-green-300'>
                Log In
              </button>
            </form>
            <p className='text-xs my-2'>OR</p>
            <div className="flex justify-between gap-2">
              <button className='w-2/4 p-1 hover:bg-gray-700 hover:text-red-400 bg-gray-700 text-red-300 text-lg w-full py-2 rounded-lg'
                onClick={(e) => this.handleSignUp(e)}>
                Sign Up
              </button>
              <button className='w-2/4 p-2 hover:bg-gray-700 hover:text-yellow-400 bg-gray-700 text-yellow-200 text-lg w-full rounded-lg'
                onClick={(e) => this.handleSampleUser(e)}>
                Try a Sample User!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);