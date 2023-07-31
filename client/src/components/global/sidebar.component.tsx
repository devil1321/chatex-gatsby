import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../../controller/actions-creators/ui.actions-creators'
import { State } from '../../controller/reducers'

const Sidebar = () => {

  const [isRooms,setIsRooms] = useState<boolean>(false)
  const [isContacts,setIsContacts] = useState<boolean>(false)
  const [isUsers,setIsUsers] = useState<boolean>(false)

  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)

  const { rooms, user,users } = useSelector((state:State) => state.api)

  return (
    <div className='sidebar'>
      <div className="sidebar__item" onClick={()=>setIsRooms(!isRooms)}>Rooms</div>
      {isRooms 
        && rooms?.map((r:any) => <div className='sidebar__menu-item sidebar__rooms'>{r}</div>) 
      }
      <div className="sidebar__item" onClick={()=>setIsContacts(!isContacts)}>Contacts</div>
      {isContacts 
        && user?.contacts?.map((c:any) => <div className='sidebar__menu-item sidebar__contacts'>{c?.email}</div>) 
      }
      <div className="sidebar__item" onClick={()=>setIsUsers(!isUsers)}>Users</div>
      {isUsers 
        && users?.map((u:any) => <div className='sidebar__menu-item sidebar__users'>{u?.email}</div>) 
      }
      <button onClick={()=>UI.handleSidebar()}>Close</button>
    </div>
  )
}

export default Sidebar
