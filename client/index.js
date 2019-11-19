import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';

//https://www.apollographql.com/docs/react/get-started/
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="song/new" component={SongCreate} />
        </Route>
      </Router>     
    </ApolloProvider>
  );    
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
