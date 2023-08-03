import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../controller/actions-creators/ui.actions-creators'
import * as ApiActions from '../controller/actions-creators/api.actions-creators'
import { Link, navigate } from 'gatsby';

interface FormDataState {
  email:string;
  password:string;
}


const Login = () => {

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const [formData,setFormData] = useState<FormDataState>({
    email:'',
    password:'',
  })

  const [response,setResponse] = useState<string>('')

  const [err,setErr] = useState<string[] | null>(null)
  const [isSubmited,setIsSubmited] = useState<boolean>(false)

  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)
  const apiActions = bindActionCreators(ApiActions,dispatch)


  const handleChange = (e:any) =>{
    setFormData((prevState)=>{
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleError = (resetTime:number):void =>{
    const tmp = []
    
    switch(response){
      case 'Invalid User':
        tmp.push('Username does not exists')
        break
      case 'Invalid Email':
        tmp.push('Email is invalid')
        break
      case 'Password Not Match':
        tmp.push('Password not match')
    }

    setErr(tmp)
    setTimeout(() => {
      setErr(null)
    }, resetTime);
  }

  const handleAnimateErrors = (delay:number,resetTime:number):void =>{
    const errors = document.querySelectorAll('.cred__err-text') as NodeListOf<HTMLDivElement>
    let time = 100
    errors.forEach(err => {
      err.style.transition = 'all 0.3s ease-in-out'
      setTimeout(() => {
        err.style.transform = 'translateX(0px)'
      }, time += delay);
    })
    setTimeout(() => {
      errors.forEach(err => {
        err.style.transition = 'all 0s ease-in-out'
        err.style.transform = 'translateX(-500px)'
      })
    }, resetTime);
  }

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    handleError(5000)
    apiActions.login(formData)
    setIsSubmited(!isSubmited)
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

useEffect(()=>{
  handleAnimateErrors(200,5000)
},[isSubmited])


  return (
    <div className='cred' onClick={(e)=>UI.handleCredInputBorder(e)}>
      <form action="" className='cred__form' onSubmit={(e)=>handleSubmit(e)}> 
        <img src="/login.svg" alt="login" />
        {err && <div className='cred__err'>
          {err.map(error => <div className='cred__err-text'>{error}</div>)}
        </div>}
        <label htmlFor="">Email:</label>
        <div className="cred__field" onClick={(e)=>{
          UI.handleCredInputFocus(e)
          UI.handleCredInputBorder(e)
        }}>
          <input type="text" name='email' value={formData.email} onChange={(e)=>handleChange(e)} required/>
        </div>
        <label htmlFor="">Password:</label>
        <div className="cred__field" onClick={(e)=>{
          UI.handleCredInputFocus(e)
          UI.handleCredInputBorder(e)
        }}>
          <input type="password" name='password' value={formData.password} onChange={(e)=>handleChange(e)} required/>
        </div>
        <Link to="/register">Register</Link>
        <button className="cred__submit">Login</button>
      </form>
    </div>
  )
}

export default Login
