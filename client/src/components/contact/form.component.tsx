import React, { useState } from 'react'

interface FormState{
  email:string;
  name:string;
  message:string;
}

const Form = () => {

  const [formData,setFormData] = useState<FormState>({
    email:'',
    name:'',
    message:''
  })

  const handleChange = (e:any) =>{
    setFormData(prevState=>{
      return{
        ...prevState,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleSubmit = (e:any) =>{
    e.preventDefault()
  }

  return (
    <div className='contact__form'>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <div className="contact__form-field">
          <label htmlFor="">Email:</label>
          <input type="email" name='email' value={formData.email} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="contact__form-field">
          <label htmlFor="">Name:</label>
          <input type="text" name='name' value={formData.name} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="contact__form-field">
          <label htmlFor="">Message:</label>
          <textarea name="" id="" className='message' value={formData.message} onChange={(e)=>handleChange(e)}></textarea>
        </div>
        <button type='submit'>Send Message</button>
      </form>
    </div>
  )
}

export default Form
