import React from 'react'
import { GlobalComponents } from '../components/global'
import { ProfileComponents } from '../components/profile'

const Profile = () => {
  return (
    <GlobalComponents.Layout title='Profile' className='profile'>
      <div className="profile__inner-wrapper">
        <ProfileComponents.Contacts />
        <div className="profile__item">
          <ProfileComponents.Form />
          <ProfileComponents.Widget />
        </div>
        <div className="profile__item">
          <ProfileComponents.Info />
          <h3 className='profile__rooms-title'>Last Joined Rooms:</h3>
          <ProfileComponents.Room room="Mercury" date={new Date().toISOString()}/>
          <ProfileComponents.Room room="Abra Cadabra" date={new Date().toISOString()}/>
          <ProfileComponents.Room room="Poland" date={new Date().toISOString()}/>
          <ProfileComponents.Room room="English" date={new Date().toISOString()}/>
        </div>
      </div>
    </GlobalComponents.Layout>
  )
}

export default Profile
