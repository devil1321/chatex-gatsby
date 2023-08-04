import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controller/reducers'
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'
import { User } from '../../controller/interfaces'

const Form = () => {

  const { user } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)

  const [formData,setFormData] = useState<User>({
    username:'',
    email:'',
    password:'',
    phone:'',
    aboutMe:'',
    isOnline:true,
    contacts:user?.contacts
  })

  const [isSubmited,setIsSubmited] = useState<boolean>(false)
  const [message,setMessage] = useState<string>('')

  const handleChange = (e:any) =>{
    setFormData((prevState)=>{
      return{
        ...prevState,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    if(user.contacts){
      apiActions.updateUser(formData)
      setFormData({
        username:'',
        email:'',
        password:'',
        phone:'',
        aboutMe:'',
        isOnline:true,
        contacts:user?.contacts
      })
      setMessage('Profile Updated')
    }else{
      setMessage('You need to be logged in')
    }
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

  useEffect(()=>{
    handleAnimateErrors(200,5000)
    setFormData({
      username:user?.username,
      email:user?.email,
      password:user?.password,
      phone:user?.phone,
      aboutMe:user?.aboutMe,
      isOnline:user?.isOnline,
      contacts:user?.contacts
    })
  },[isSubmited,user])

  return (
    <div className='profile__form-wrapper'>
      <h1>Settings</h1>
      <div className='profile__err'>
        <div className='profile__err-text'>{message}</div>
      </div>
      <form className='profile__form' action="" onSubmit={(e)=>{
        handleSubmit(e)
      }}>
        <div className="profile__field">
            <label htmlFor="">Username:</label>
            <input type="text" name="username" onChange={(e)=>handleChange(e)} value={formData.username} />
        </div>
        <div className="profile__field">
            <label htmlFor="">Email:</label>
            <input type="email" name="email" onChange={(e)=>handleChange(e)} value={formData.email}/>
        </div>
        <div className="profile__field">
            <label htmlFor="">Password:</label>
            <input type="password" name="password" onChange={(e)=>handleChange(e)} value={formData.password}/>
        </div>
        <div className="profile__field">
            <label htmlFor="">Phone:</label>
            <input type="text" name="phone" onChange={(e)=>handleChange(e)} value={formData.phone}/>
        </div>
        <div className="profile__field">
            <label htmlFor="">About Me:</label>
            <textarea name="aboutMe" onChange={(e)=>handleChange(e)} value={formData.aboutMe}/>
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default Form
