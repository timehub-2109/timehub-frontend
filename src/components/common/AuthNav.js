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
      className="px-2 md:px-6 text-white inline-block text-center py-3"
      activeClassName="bg-gray-100 text-gray-700">
      {name}
    </NavLink>
  );
});


class Nav extends React.Component {
  render() {
    return (
      <nav className="w-full shadow-lg flex font-medium bg-gray-700">
        <Link to="/">
          <img className='w-12 ml-4 mr-4 md:-mr-4'
               src={process.env.PUBLIC_URL + '/images/logos/timehub_color_graphic.svg'}
               alt="The timehub icon" 
          />
        </Link>
        <ul className="flex justify-between w-full mr-4 md:w-4/6 md:mx-auto">         
          {pageList}
        </ul>
      </nav>
    );
  }
}

export default Nav;