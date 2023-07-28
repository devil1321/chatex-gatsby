import React from 'react'

const Info = () => {
  return (
    <div className='profile__info'>
      <div className="profile__info-img">
        <img src="/user.png" alt="" />
      </div>
      <div className="profile__info-information">
        <label htmlFor="">Username:</label>
        <p>Dominik1321</p>
        <label htmlFor="">Email:</label>
        <p>s.dominik1321@gmail.com</p>
        <label htmlFor="">Phone:</label>
        <p>8736-321312-3123</p>
        <label htmlFor="">About Me:</label>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quibusdam rem quis repudiandae quae dolorem alias debitis impedit sint inventore.</p>
      </div>
    </div>
  )
}

export default Info
