import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controller/reducers'
import * as ChatActions from '../../controller/actions-creators/chat.action-creators'
import { navigate } from 'gatsby'

const Contacts = () => {

  const { user } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)

  const [matches,setMatches] = useState<any[]>(user?.contacts)

  const handleChange = (e:any) => {
    const users_nodes = document.querySelectorAll('.profile__contact') as NodeListOf<HTMLDivElement>
    users_nodes.forEach(n => {
      n.style.transition = 'all 0s ease-in-out'
      n.style.transform = 'translateX(-500px)'
    })
    if(e.target.value.length === 0){
      setMatches(user?.contacts)
    }else{
      const tmp = user?.contacts?.filter((u:any) => {
        const regExp = new RegExp(`^${e.target.value}`,'i')
        return regExp.test(u?.email) || regExp.test(u?.username)
      })
      setMatches(tmp)
    }
  }

  const handleAnimation = (startTime:number,delay:number):void =>{
    const users = document.querySelectorAll('.profile__contact') as NodeListOf<HTMLDivElement>
    users.forEach(user => {
      setTimeout(() => {
        user.style.transition = 'all 0.3s ease-in-out'
        user.style.transform = 'translateX(0px)'
      }, startTime += delay)
    })
  }

  useEffect(()=>{
    handleAnimation(0,100)
  },[matches])
  return (
    <div className='profile__contacts'>
      {matches?.map((u,i) =>{
        return(
            <div key={i} className={`profile__contact ${u?.isOnline ? 'online' : 'offline'}`}
              onClick={()=>{
                chatActions.handleReciver(u)
                chatActions.handleRoom('private')
                setTimeout(() => {
                  navigate('/chat')
                }, 500);
              }}
            >{u?.email}</div>
        )
      })}
      <div className="profile__contacts-search">
        <form action="">
          <div className="profile__contacts-field">
            <input type="text" onChange={(e)=>{handleChange(e)}} />
          </div>
          <button type='submit'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default Contacts
