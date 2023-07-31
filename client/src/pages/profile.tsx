import React,{ useEffect } from 'react'
import { GlobalComponents } from '../components/global'
import { ProfileComponents } from '../components/profile'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '../controller/reducers'
import { bindActionCreators } from 'redux'
import * as ApiActions from '../controller/actions-creators/api.actions-creators'

const Profile = () => {

  const { lastRooms,user } = useSelector((state:State) =>state.api)
  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)

  useEffect(()=>{
    apiActions.lastRooms(user)
  },[user])

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
          {lastRooms?.map((r:any) => {
            if(r?.messages[0]?.date){
              return <ProfileComponents.Room room={r.room} date={r?.messages[0]?.date}/>
            }
          })}
        </div>
      </div>
    </GlobalComponents.Layout>
  )
}

export default Profile
