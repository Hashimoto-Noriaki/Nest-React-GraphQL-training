import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import MainPage from './components/pages/MainPage'
import NotFound from './components/pages/NotFound'
import './App.css'

function App() {

  return (
    <>
      <div className="App">
        <SignIn/>
        <SignUp/>
        <MainPage/>
        <NotFound/>
      </div>
    </>
  )
}

export default App
