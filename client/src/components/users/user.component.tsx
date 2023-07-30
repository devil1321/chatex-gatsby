import React ,{ useState,useRef, MutableRefObject } from 'react'
import { User as UserInterface  } from '../../controller/interfaces';
import { navigate } from 'gatsby'

import { useDispatch,useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ChatActions from '../../controller/actions-creators/chat.action-creators'
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'
import { State } from '../../controller/reducers';

const User:React.FC<{user:UserInterface}> = ({user}) => {

  const { user:userReduxState } = useSelector((state:State) => state.api)
  const { room } = useSelector((state:State) => state.chat)
  const dispatch = useDispatch()
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const apiActions = bindActionCreators(ApiActions,dispatch)

  const [isInfo,setIsInfo] = useState<boolean>(false)
  const userInfoRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleContact = () =>{
    chatActions.handleRoom('private')
    chatActions.handleReciver(user)
    apiActions.sendPrivateMessage({
      reciver:{
        email:user.email,
      },
      sender:userReduxState?.email,
      message:{
        user:user?.email,
        message:`Contanct With User ${user?.email}`,
        room:room
      }
    })
    setTimeout(() => {
      navigate('/chat')
    }, 500);
  }

  const handleAnim = () =>{
    if(!isInfo){
      setIsInfo(true)
      setTimeout(() => {
        if(userInfoRef.current !== null){
          userInfoRef.current.style.height = 'fit-content'
          userInfoRef.current.style.width = 'fit-content'
          userInfoRef.current.style.animation = 'fadeIn 0.5s ease-in-out forwards'
        }
      }, 200);
    }else{
  
      userInfoRef.current.style.animation = 'fadeOut 0.5s ease-in-out forwards'
      let timeout
      let set = () =>{
          setIsInfo(false)
          userInfoRef.current.style.height = '0%'
          userInfoRef.current.style.width = '0%'
      }
      clearTimeout(timeout)
      timeout = setTimeout(set, 500);
    }
  }

  return (
    <div className={`users__user ${user.isOnline ? 'online' : 'offline'}`}>
      <div className="users__user-img">
        <img src="/user.png" alt="" />
      </div>
      <p>{user.email}</p>
      <div className="users__user-menu">
        <button onClick={()=>handleAnim()}>Info</button>
        {isInfo 
          && <div className="users__user-info" ref={userInfoRef}>
          <p>{user.aboutMe?.length > 0 ? user.aboutMe : user.email}</p>
        </div>}
        <button onClick={()=>{
          handleContact()
        }}>Chat</button>
      </div>
    </div>
  )
}

export default User
