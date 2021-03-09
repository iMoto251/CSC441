/*
 * SignupPage
 *
 * List all the features
 */
import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import postData from '../../../nodeClient/index';

import H1 from 'components/H1';

export default function SignupPage(props) {
  console.log('in SignupPage');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <div>
          Sign Up
        </div>
      </H1>
      <div>
        <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
        />
        <button onClick={e=>{postData()}} type="submit">Sign Up</button>
      </div>
    </div>
  );
}
