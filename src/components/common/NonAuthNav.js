import React from "react";
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router";
import Auth from "../auth/Auth";

class NonAuthNav extends React.Component {
  async handleSampleUser(e) {
    try {
      await Auth.login({ email: 'sddoherty4@gmail.com', password: 'foobar1' });
      this.props.history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  }

  render() {   
    return (
      <nav className="sticky top-0 z-50 bg-gray-700 text-white shadow-lg">
        <ul className="flex sm:text-xl justify-around text-center font-semibold items-center">
          <li className="flex-1 flex items-center">
            <NavLink exact to="/" 
                     className="flex-1 py-3"
                     activeClassName="bg-gray-100 text-gray-700">
                     Case Study
            </NavLink>
          </li>
          <li className="flex-1 flex" 
              onClick={(e) => this.handleSampleUser(e)}>
              <button className="focus:outline-none focus:bg-gray-100 focus:text-gray-700 flex-1 py-3 font-semibold">Try Sample User</button>
          </li>
          <li className="flex-1 flex">
            <NavLink to="/login" 
                     className="flex-1 py-3"
                     activeClassName="bg-gray-100 text-gray-700">
                     Sign up/Login
            </NavLink>
          </li>
          <li className="flex-1 flex">
            <NavLink to="/oas-specs" 
                     className="flex-1 py-3"
                     activeClassName="bg-gray-100 text-gray-700">
                     OAS Specs
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(NonAuthNav)