import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import Contents from './Contents';
import Layout from './Layout';

const Home = () => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Layout>
        <Contents />
      </Layout>
    </div>
  );
};
export default React.memo(Home);
