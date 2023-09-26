import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import  { Quiz } from './components/quiz/Quiz';

import NavBar from './components/navbar/Navbar'
import './index.css';
import './App.css';

// construct the main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authenticaiton token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers, 
            authorization: token ? `Bearer ${token} :` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <NavBar />
                {/* <Quiz /> */}
            </Router>
        </ApolloProvider>
    );
}

export default App;