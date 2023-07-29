import React,{ useEffect } from 'react'
import { navigate } from 'gatsby'
import { GlobalComponents } from '../components/global'
import { State } from '../controller/reducers'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ApiActions from '../controller/actions-creators/api.actions-creators'
import * as ChatActions from '../controller/actions-creators/chat.action-creators'

const Rooms = () => {

  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)
  const chatActions = bindActionCreators(ChatActions,dispatch)
  const { rooms } = useSelector((state:State) => state.api)

  const handleNavigate = () =>{
    setTimeout(() => {
      navigate('/chat')
    }, 500);
  }

  useEffect(()=>{
    apiActions.getRooms()
  },[])

  return (
    <GlobalComponents.LayoutWithSidebar title="rooms" className='rooms'>
        <div className="rooms__wrapper">
            {rooms.map((r:string) => {
              return(
                  <div key={r} className='rooms__room' onClick={()=>{
                    chatActions.handleRoom(r)
                    handleNavigate()
                  }}>{r}</div>
                  )
            })}
        </div>
    </GlobalComponents.LayoutWithSidebar>
  )
}

export default Rooms
