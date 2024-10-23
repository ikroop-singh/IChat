import Home from './pages/home/Home'
import { Routes,Route, Navigate } from 'react-router-dom'
import SignUp from '../src/pages/signup/Signup'
import Login from '../src/pages/login/Login'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

function App() {
  const{authUser}=useContext(AuthContext)

  return (
    <>
      <div className='h-screen p-4 flex justify-center '>
        <Routes>
          <Route path='/'element={!authUser?<Navigate to='/login'/>:<Home/>}/>
          <Route path='/login' element={authUser?<Navigate to='/'/>:<Login/>}/>
          <Route path='/signup' element={authUser?<Navigate to='/'/>:<SignUp/>}/>

        </Routes>
      </div>
    </>
  )
}

export default App
