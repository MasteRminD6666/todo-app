import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { If } from 'react-if';
export default function Auth(props) {
  const { loggedIn, username, capabilities } = useContext(AuthContext);
  console.log('here', capabilities);
  let okToRender = loggedIn && username ? capabilities?.includes(props.capability) : false;

  return (
    <If condition={okToRender}>
      <>{props.children}</>
    </If>
  );
}
