import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../controller/reducers'
const Info = () => {

  const { user } = useSelector((state:State)=>state.api)

  return (
    <div className='profile__info'>
      <div className="profile__info-img">
        <img src="/user.png" alt="" />
      </div>
      <div className="profile__info-information">
        <label htmlFor="">Username:</label>
        <p>{user?.username}</p>
        <label htmlFor="">Email:</label>
        <p>{user?.email}</p>
        <label htmlFor="">Phone:</label>
        <p>{user?.phone}</p>
        <label htmlFor="">About Me:</label>
        <p>{user?.aboutMe}</p>
      </div>
    </div>
  )
}

export default Info
