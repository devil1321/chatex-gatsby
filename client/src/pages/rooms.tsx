import React,{ useEffect, useState } from 'react'
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

  const [room,setRoom] = useState<string>('')

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    chatActions.handleRoom(room)
    apiActions.createRoom(room)
    handleNavigate()
  }

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
            {rooms?.map((r:string) => {
              return(
                  <div key={r} className='rooms__room' onClick={()=>{
                    chatActions.handleRoom(r)
                    handleNavigate()
                  }}>{r}</div>
                  )
            })}
        </div>
        <div className="rooms__create-room">
          <h2>Create Room</h2>
          <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="">Room Name:</label>
            <div className="rooms__field">
              <input type="text" value={room} onChange={(e)=>setRoom(e.target.value)} />
            </div>
            <button type='submit'>Create</button>
          </form>
        </div>
    </GlobalComponents.LayoutWithSidebar>
  )
}

export default Rooms
