import React, { MutableRefObject,useRef,useEffect, useState } from 'react'
import { State } from '../../controller/reducers'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'
import * as ChatActions from '../../controller/actions-creators/chat.action-creators'
import { User } from '../../controller/interfaces'

interface Message{
  user:User;
  message:string;
}

const Users = () => {

  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const { activeRoom } = useSelector((state:State) => state.api) 
  const { room , reciver} = useSelector((state:State) => state.chat) 
  
  const [matches,setMatches] = useState<Message[]>([])
  const [active,setActive] = useState<string>('')

  const handleChange = (e:any) => {
    const users_nodes = document.querySelectorAll('.chat__users-user') as NodeListOf<HTMLDivElement>
    users_nodes.forEach(n => {
      n.style.transition = 'all 0s ease-in-out'
      n.style.transform = 'translateX(-500px)'
    })
    if(e.target.value.length === 0){
      setMatches(activeRoom?.messages?.messages)
    }else{
      const tmp = activeRoom?.messages?.messages.filter((m:Message) => {
        const regExp = new RegExp(`^user:${e.target.value}`,'i')
        return regExp.test(m?.user?.email)
      })
      setMatches(removeDuplicates(tmp))
    }
  }

  const handleAnimation = (startTime:number,delay:number):void =>{
    const users = document.querySelectorAll('.chat__users-user') as NodeListOf<HTMLDivElement>
    users.forEach(user => {
      setTimeout(() => {
        user.style.transition = 'all 0.3s ease-in-out'
        user.style.transform = 'translateX(0px)'
      }, startTime += delay)
    })
  }

  const handleSetMatches = () =>{
    apiActions.getRoomMessages(room)
    setTimeout(() => {
      setMatches(removeDuplicates(activeRoom?.messages?.messages))
    }, 100);
  }

  const removeDuplicates = (arr: Message[]): Message[] => {
    const uniqueEmails = new Set<string>();
    if(arr?.length > 0){
      return arr.filter((message) => {
        if (!uniqueEmails.has(message?.user?.email)) {
          uniqueEmails.add(message?.user?.email);
          return true;
        }
        return false;
      });
    }else{
      return []
    }
  }

  const handleActive = () =>{
    matches.forEach(m=>{
      if(reciver.email === m?.user?.email){
        setActive('active')
      }
    })
  }

  useEffect(()=>{
    handleActive()
  },[reciver])

  useEffect(()=>{
    handleSetMatches()
  },[room])

  useEffect(()=>{
    handleAnimation(0,100)
  },[matches])

  return (
    <div className='chat__users'>
      {matches?.map((m:Message) => {
        if(m?.user?.email && m?.user?.isOnline){
          return(
            <div className={`chat__users-user ${m?.user?.isOnline ? 'online' : 'offline' } ${active && 'active'}`}
              onClick={()=>{
                chatActions.handleReciver(m?.user)
                chatActions.handleRoom('private')
              }}
            >{m?.user?.email}</div>
            )
        }else{
          return null
        }
      })}
      <div className="chat__users-search">
        <form action="">
          <div className="chat__users-field">
            <input type="text" onChange={(e)=>handleChange(e)} />
          </div>
          <button type='submit'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default Users
