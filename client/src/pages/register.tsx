import React,{ useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../controller/actions-creators/ui.actions-creators'
import * as ApiActions from '../controller/actions-creators/api.actions-creators'

import { Link, navigate } from 'gatsby';

interface FormDataState {
  username:string;
  email:string;
  password_1:string;
  password_2:string;
}

const Register = () => {

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const [formData,setFormData] = useState<FormDataState>({
    username:'',
    email:'',
    password_1:'',
    password_2:''
  })

  const [err,setErr] = useState<string[] | null>(null)
  const [isSubmited,setIsSubmited] = useState<boolean>(false)

  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)
  const apiActions = bindActionCreators(ApiActions,dispatch)

  const handleChange = (e:any):void =>{
    setFormData((prevState)=>{
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleError = (formData:FormDataState,resetTime:number):void =>{
      const tmp = []
      if(formData.username.length < 3){
        tmp.push('Username should have minimum 3 characters')
      }
      if(!emailRegex.test(formData.email)){
        tmp.push('Email is invalid')
      }
      if(formData.password_1.length < 6){
        if(!tmp.includes('Password should have minimum 6 characters')){
          tmp.push('Password should have minimum 6 characters')
        }
      }
      if(formData.password_2.length < 6){
        if(!tmp.includes('Password should have minimum 6 characters')){
          tmp.push('Password should have minimum 6 characters')
        }
      }
      if(formData.password_1 !== formData.password_2){
        tmp.push('Passwords not match')
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
      apiActions.register(formData)
      handleError(formData,5000)
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
        <img src="/sign-up.svg" alt="register" />
        {err && <div className='cred__err'>
          {err.map(error => <div className='cred__err-text'>{error}</div>)}
        </div>}
        <label htmlFor="">Username:</label>
        <div className="cred__field" onClick={(e)=>{
          UI.handleCredInputFocus(e)
          UI.handleCredInputBorder(e)
        }}>
          <input type="text" name="username" value={formData.username} onChange={(e)=>handleChange(e)} />
        </div>
        <label htmlFor="">Email:</label>
        <div className="cred__field" onClick={(e)=>{
          UI.handleCredInputFocus(e)
          UI.handleCredInputBorder(e)
        }}>
          <input type="text" name="email" value={formData.email} onChange={(e)=>handleChange(e)} required/>
        </div>
        <label htmlFor="">Password:</label>
        <div className="cred__field" onClick={(e)=>{
          UI.handleCredInputFocus(e)
          UI.handleCredInputBorder(e)
        }}>
          <input type="password" name="password_1" value={formData.password_1} onChange={(e)=>handleChange(e)} required/>
        </div>
        <label htmlFor="">Confirm Password:</label>
        <div className="cred__field" onClick={(e)=>{
          UI.handleCredInputFocus(e)
          UI.handleCredInputBorder(e)
        }}>
          <input type="password" name="password_2" value={formData.password_2} onChange={(e)=>handleChange(e)} required/>
        </div>
        <Link to="/login">Login</Link>
        <button className="cred__submit">Register</button>
      </form>
    </div>
  )
}

export default Register
