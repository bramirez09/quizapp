import { React } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { QUERY_QUIZ } from '../src/utils/queries';
import { useQuery } from '@apollo/client';

import NavBar from './components/navbar/Navbar'
import Profile from './components/Profile/Profile';
import Quiz from './components/Quiz/Quiz';
import Footer from './components/Footer/Footer'

import './index.css';

// import './App.css';

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
  const { loading, data, error } = useQuery(QUERY_QUIZ);
  const quizzes = data?.quizzes || [];
  console.log(data)

  if (loading) {
    return <p>Loading...</p>;
}

if (error) {
    console.error("Error fetching quiz data:", error);
    return <p>Error fetching quiz data.</p>;
}

    return (
        <ApolloProvider client={client}>
          <Router>
            <NavBar />
            <Routes>
              <Route path='/' element={<Quiz quizzes={quizzes}/>} />
              <Route path='/me' element={<Profile />} />
              <Route path="/profiles/:username" element={<Profile />}/>
            </Routes>
          </Router>
          <Footer />
        </ApolloProvider>
)};

export default App;