/*
 * SigninPage
 *
 * List all the features
 */
import React, {useState} from 'react';
import { Helmet } from 'react-helmet';

import H1 from 'components/H1';

export default function SigninPage(props) {
  console.log('in SigninPage');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Helmet>
        <title>Sign In Page</title>
        <meta
          name="description"
          content="Sign In page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <div>
          Sign In
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
        <button onClick={e=>{postData()}} type="submit">Log In</button>
      </div>
    </div>
  );
}
