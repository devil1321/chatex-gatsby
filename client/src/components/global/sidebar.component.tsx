import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../../controller/actions-creators/ui.actions-creators'

const Sidebar = () => {

  const [isRooms,setIsRooms] = useState<boolean>(false)
  const [isContacts,setIsContacts] = useState<boolean>(false)
  const [isUsers,setIsUsers] = useState<boolean>(false)

  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)

  return (
    <div className='sidebar'>
      <div className="sidebar__item" onClick={()=>setIsRooms(!isRooms)}>Rooms</div>
      {isRooms 
        && <div className='sidebar__menu-item sidebar__rooms'>dd</div> 
      }
      <div className="sidebar__item" onClick={()=>setIsContacts(!isContacts)}>Contacts</div>
      {isContacts 
        && <div className='sidebar__menu-item sidebar__contacts'>dd</div> 
      }
      <div className="sidebar__item" onClick={()=>setIsUsers(!isUsers)}>Users</div>
      {isUsers 
        && <div className='sidebar__menu-item sidebar__users'>dd</div> 
      }
      <button onClick={()=>UI.handleSidebar()}>Close</button>
    </div>
  )
}

export default Sidebar
