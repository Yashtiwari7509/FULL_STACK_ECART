import React, { useState, SyntheticEvent } from 'react'
import axios from 'axios'
import { UserErorr } from '../../models/erorrs'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import './style.css'

const AuthPage = () => {
  return (
    <div className='parent-Container'>
      <div className="auth-container">
        <Register />
        <Login />
      </div>
    </div>
  )
}



const Register = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleSubmit = async (event: SyntheticEvent) => {
    event?.preventDefault()
    try {
      await axios.post('http://localhost:3001/user/register', {
        username,
        password
      });
      setPassword('')
      setUsername('')
      alert('registration Completed')
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.type === UserErorr.USERNAME_ALREADY_EXISTS) {

        alert('ERROR : already exist')
      }
      else {
        alert('ERROR : something went wrong')
      }
    }

  }
  return (
    <div className='register-container'>

      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} id='username' placeholder='Set Username...' />
        <input value={password} type="password" id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Set password...' />
        <input type="submit" style={{ background: "green", color: 'white' }} value="Register" />
      </form>
    </div>
  )
}

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [_, setCookies] = useCookies(["accessToken"])
  const handleSubmit = async (event: SyntheticEvent) => {
    event?.preventDefault()
    try {
      const result = await axios.post('http://localhost:3001/user/login', {
        username,
        password
      });
      setCookies('accessToken', result.data.token)
      localStorage.setItem('userID', result.data.userId)
      setPassword('')
      setUsername('')
      navigate('/')
      window.location.reload()
    } catch (error: any) {
      let errorMessage: string = "";
      switch (error?.response?.data?.type) {
        case UserErorr.WRONG_CREDENTIALS:
          errorMessage = "password/username might be wrong"
          break;
        case UserErorr.USER_NOT_FOUND:
          errorMessage = "not found :_:"
          break;
        default:
          errorMessage = "something went wrong"
      }
      alert("error " + errorMessage)
    }
  }
  return (
    <div className='Login-container'>

      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} id='username' placeholder='Your Username...' />
        <input value={password} type="password" id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Your Password...' />
        <input type="submit" value='Login' style={{ background: 'skyblue' }} />
      </form>
    </div>
  )
}
export default AuthPage