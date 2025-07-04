import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Main from './components/pages/Main'
import NotFound from './components/pages/NotFound'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
