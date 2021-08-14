import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Account from './Account';
import AccountList from './AccountList';
import Auth from '../auth/Auth';

function LinkedAccounts(props) {
  const { url, path } = useRouteMatch();
  const [accountIDs, setAccountIDs] = useState({ 'toggl': "", 'harvest': "", 'clockify': "" });

  useEffect(() => {
    const fetchAccountIDs = async () => {
      const accounts = await Auth.get(`/sources`);
      let ids = {};
      accounts.forEach(acct => ids[acct.name] = acct.id);
      setAccountIDs({ accountIDs: ids });
    }
    fetchAccountIDs();
  }, [])

  return (
    <Switch>
      <Route exact path={path}>
        <AccountList url={url} />
      </Route>
      <Route path={`${path}/:accountName`}>
        <Account {...accountIDs} handleRefreshFlag={props.handleRefreshFlag} />
      </Route>
    </Switch>
  );
}

export default LinkedAccounts;
