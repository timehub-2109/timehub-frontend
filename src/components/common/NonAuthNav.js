import React from "react";
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router";
import Auth from "../auth/Auth";

const links = [
  {
    to: "/",
    name: "Overview"
  },
  {
    to: "/writeup",
    name: "Case Study"
  },
  {
    to: "/team",
    name: "Meet the Team"
  },
  {
    to: "/login",
    name: "Signup / Login"
  },
];

const linkList = links.map(link => {
  return (
    <li className="flex">
      <NavLink exact to={link.to}
        className="flex-1 px-2 py-3"
        activeClassName="bg-gray-500 text-gray-700">
        {link.name}
      </NavLink>
    </li>
  )
});

class NonAuthNav extends React.Component {
  constructor() {
    super();
    this.state = {
      hide: true,
    };
  }

  async handleSampleUser(e) {
    try {
      await Auth.login({ email: 'sddoherty4@gmail.com', password: 'foobar1' });
      this.props.history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  }

  toggleButton() {
    this.setState(prevState => {
      return { hide: !prevState.hide }
    });
  }

  render() {
    return (
      <div>
        <div className="fixed bg-gray-700 h-12 w-full align-center z-50">
          <button className="fixed right-3 top-2 z-50"
            onClick={() => this.toggleButton()}>
            <img className="fixed w-8 right-3 top-2 shadow-xl"
              src={`${process.env.PUBLIC_URL}/images/icons/menu.svg`}
              alt="a menu icon">
            </img>
          </button>
        </div>
        <nav className={`fixed bg-gray-700 text-white w-full text-center shadow-lg transform duration-200 ${this.state.hide ? "-translate-y-full" : ""} ease-in-out`}>
          <ul className="flex-col sm:text-lg py-20 font-semibold items-center">
            <img className="w-12 mx-auto pb-2 -mt-5"
              src={`${process.env.PUBLIC_URL}/images/logos/timehub_color_graphic.svg`}
              alt="timehub logo">
            </img>
            {linkList}
            <li className="flex"
              onClick={(e) => this.handleSampleUser(e)}>
              <button className="px-2 py-3 text-yellow-300 focus:outline-none focus:bg-gray-500 focus:text-gray-700 flex-1 font-semibold">Try Sample User</button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(NonAuthNav)