import React from 'react'

const Form = () => {
  return (
    <div className='profile__form-wrapper'>
      <h1>Settings</h1>
      <form className='profile__form' action="">
        <div className="profile__field">
            <label htmlFor="">Username:</label>
            <input type="text" name="username" />
        </div>
        <div className="profile__field">
            <label htmlFor="">Email:</label>
            <input type="email" name="email" />
        </div>
        <div className="profile__field">
            <label htmlFor="">Password:</label>
            <input type="password" name="email" />
        </div>
        <div className="profile__field">
            <label htmlFor="">Phone:</label>
            <input type="text" name="phone" />
        </div>
        <div className="profile__field">
            <label htmlFor="">About Me:</label>
            <textarea name="desc" />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default Form
