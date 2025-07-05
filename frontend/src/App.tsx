import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Main from './components/pages/Main'
import NotFound from './components/pages/NotFound'
import { GuestRoute,PrivateRoute } from './AuthRoute'
import client from './apollo/client'
import { ApolloProvider } from '@apollo/client'
import './App.css'

function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute children={<Main/>}/>}/>
          <Route path='/signin' element={<GuestRoute children={<SignIn/>}/>}/>
          <Route path='/signup' element={<GuestRoute children={<SignUp/>}/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
