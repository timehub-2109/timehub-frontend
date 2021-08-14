import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import Auth from '../auth/Auth';
import Cancel from '../common/Cancel';

const accounts = {
  'harvest': {
    name: 'Harvest',
    icon: 'harvest-logo.png',
    iconAlt: 'the harvest logo',
    link: "https://id.getharvest.com/developers",
    inputs: [{
      name: 'account_id',
      label: "Account id",
      type: "text",
      placeholder: "eg: 1470936"
    },
    {
      name: 'access_token',
      label: 'Token',
      type: "text",
      placeholder: "eg: 2721249.pt.PRQuFsQF0-PpRZ5KnCfCoTrKt_rpI-zl74EHiKu7cX1yLdey_Rt0_RMx4K9wK-gzYvhm0k3pw273lhkRXzBtcw"
    }],
    instructions: ["1. Click, 'Create New Personal Access Token'.",
      "2. Name it whatever you want, and click 'Create Personal Access Token'.",
      "3. Copy and paste 'Account Id' and 'Your Token' into the matching fields below."],
  },
  'toggl': {
    name: 'Toggl',
    icon: "toggl-logo.png",
    iconAlt: 'the toggl icon',
    link: "https://track.toggl.com/profile",
    inputs: [{
      name: 'access_token',
      label: "Access token",
      type: "text",
      placeholder: "eg: c2a27e81ceb548db314a7f3c5346ea20"
    }],
    instructions: ["1. Scroll down to the box labeled 'API Token' and click to reveal'.",
      "2. Copy and paste this token into the field below."],
  },
  'clockify': {
    name: 'Clockify',
    icon: "clockify.svg",
    iconAlt: 'the clockify logo',
    link: "https://clockify.me/user/settings",
    inputs: [{
      name: 'access_token',
      label: "Access token",
      type: "text",
      placeholder: "eg: YzZjMjI2MzItNDMxNC00YmQ5LWI3NzMtNjQ1NGNlNGE0NDBh"
    }],
    instructions: ["1. Scroll down to the 'API' section and click 'Generate' to retrieve an API key.",
      "2. Copy and paste this token into the field below."],
  }
};

function Account(props) {
  const history = useHistory();
  const { accountName } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    let account = accounts[accountName];
    let id = props.accountIDs[account.name.toLowerCase()];
    if (id) await Auth.delete(`/sources/${id}`);

    let reqBody = { name: account.name.toLowerCase() };
    e.target.querySelectorAll('input').forEach(input => reqBody[input.name] = input.value);

    try {
      await Auth.post(reqBody, "/sources");
      await Auth.get("/refresh");      
      props.handleRefreshFlag();
      history.push("/linked-accounts");
    } catch (error) {
      alert(error);
    }
  }

  let account = accounts[accountName];
  if (!account) return <Redirect to="/not-found" />;

  const inputs = account.inputs.map(input => {
    return (
      <div key={input.name} className="flex flex-col justify-left mt-2">
        <label htmlFor={input.name}
          className='text-sm text-gray-700'>
          {input.label}
        </label>
        <input name={input.name}
          type="text"
          placeholder={input.placeholder}
          className='border border-gray-300 text-gray-400 py-1.5 px-2 rounded-md hover:border-blue-400'
        />
      </div>
    );
  })
  const instructions = account.instructions.map((step, idx) => {
    return <p key={`step_${idx}`} className="mt-1">{step}</p>
  });

  return (
    <div className="flex flex-col w-2/3 max-w-md mt-12">
      <div className="border-b border-gray-300 pb-2 flex flex-col text-center text-gray-900">
        <img className='h-20 w-20 mb-2 mx-auto'
          src={`${process.env.PUBLIC_URL}/images/logos/${account.icon}`}
          alt={account.iconAlt}
        />
        <h1 className='font-bold text-2xl mt-3'>{`Connect your ${account.name} Account`}</h1>
        <p className='text-sm font-light mt-6 mb-1'>
          Enter your <em className="font-bold">{account.name + ' '}</em>account information.
        </p>
      </div>
      <div className="flex flex-col text-sm text-gray-700 bg-yellow-100 border-2 rounded-md px-2 py-1 mt-5 mb-2">
        <h2 className="font-semibold">How To Find:</h2>
        <a className="underline mb-2" href={account.link}>{account.link}</a>
        {instructions}
      </div>
      <form onSubmit={e => handleSubmit(e)}
        className='flex flex-col items-stretch'>
        {inputs}
        <button className='bg-blue-200 text-blue-400 hover:text-blue-700 text-center rounded-md mt-8 p-3 w-full'
          type="submit">
          Submit
        </button>
      </form>

      <Cancel />
    </div>
  );
}

export default Account;