import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const pages = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Linked Accounts',
    path: '/linked-accounts',
  },
  {
    name: 'Log out',
    path: '/logout',
  }
];

const pageList = pages.map(({ name, path }) => {
  return (
    <NavLink to={`${path}`}
      key={name}
      className="flex-1 text-white inline-block font-semibold text-center py-3"
      activeClassName="bg-gray-100 text-gray-700">
      {name}
    </NavLink>
  );
});


class Nav extends React.Component {
  render() {
    return (
      <nav className="w-full shadow-lg flex font-medium bg-gray-700">
        <ul className="flex justify-between w-full mr-4">
          <li className="">
            <Link to="/">
              <img className='w-12 mx-12'
                src={process.env.PUBLIC_URL + '/images/logos/timehub_color_graphic.svg'}
                alt="The timehub icon"
              />
            </Link>
          </li>
          {pageList}
        </ul>
      </nav>
    );
  }
}

export default Nav;

