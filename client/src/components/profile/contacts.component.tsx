import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../../controller/reducers'
import * as ChatActions from '../../controller/actions-creators/chat.action-creators'
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'
import { navigate } from 'gatsby'

const Contacts = () => {

  const { user,users } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const apiActions = bindActionCreators(ApiActions,dispatch)

  const [matches,setMatches] = useState<any[]>([])
  const [contacts,setContacts] = useState<any[]>([])

  const handleChange = (e:any) => {
    const users_nodes = document.querySelectorAll('.profile__contact') as NodeListOf<HTMLDivElement>
    users_nodes.forEach(n => {
      n.style.transition = 'all 0s ease-in-out'
      n.style.transform = 'translateX(-500px)'
    })
    if(e.target.value.length === 0){
      setMatches(contacts)
    }else{
      const tmp = contacts?.filter((u:any) => {
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

  const handleFilter = () =>{
    console.log(user)
    if(user?.contacts){
    const tmpContacts = user?.contacts.map((u:any) =>{
      const contact = users.find((c:any) => c.email === u.email)
      if(contact){
        const user = {
          email:contact.email,
          isOnline:u.isOnline
        }
        return user
      }
    })
    if(user){
      setContacts([...tmpContacts])
    }
  }
} 


  useEffect(()=>{
    apiActions.getUsers()
  },[])

  useEffect(()=>{
    handleFilter()
  },[users,user])

  useEffect(()=>{
    setMatches([...contacts])
  },[contacts])

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
