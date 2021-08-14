import React from 'react';
import ListItem from './ListItems';

const accounts = [
  {
    id: 'harvest',
    name: 'Harvest',
    icon: 'harvest-logo.png',
    iconAlt: 'the harvest logo',
  },
  {
    id: 'toggl',
    name: 'Toggl',
    icon: "toggl-logo.png",
    iconAlt: 'the toggl icon',
  },
  {
    id: 'clockify',
    name: 'Clockify',
    icon: "clockify.svg",
    iconAlt: 'the clockify logo'
  }
];

function AccountList({url}) {
  return (
    <div className="flex flex-col w-2/3 max-w-md text-gray-700 mb-12">
      <div className="flex mt-12 mb-10 self-center gap-2">
      <h1 className="text-xl font-semibold text-black">Link Your Accounts</h1>
      <img className="w-5 text-center"
           alt="an account linking icon"
           src={`${process.env.PUBLIC_URL}/images/icons/edit-copy.svg`} />
    </div>
      <ul className="w-full">
      {accounts.map(account => <ListItem url={url} account={account}/>)}
      </ul>
    </div>
  );
}

export default AccountList;