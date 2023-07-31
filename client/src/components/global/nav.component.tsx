import React,{ useState,useRef, MutableRefObject } from 'react'
import { Link } from 'gatsby'
import Search from './search.component'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UIActions from '../../controller/actions-creators/ui.actions-creators'
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'

const Nav = () => {

  const [isProfile,setIsProfile] = useState<boolean>(false)
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const UI = bindActionCreators(UIActions,dispatch)
  const apiActions = bindActionCreators(ApiActions,dispatch)

  const handleMenu = () =>{
    if(!isProfile){
      menuRef.current.style.display = 'block'
      menuRef.current.style.animation = 'fadeInWithRotate 0.5s ease-in-out forwards'
      setIsProfile(true)
    }else {
      menuRef.current.style.animation = 'fadeOutWithMove 0.5s ease-in-out forwards'
      setIsProfile(false)
      let timeout = () => {
        menuRef.current.style.display = 'none'
      };
      let set = setTimeout(timeout,1000)
      clearTimeout(set)
    }
  }

  const handleLogout = () =>{

  }

  return (
    <div className='nav'>
      <div className="nav__sidebar" onClick={()=>UI.handleSidebar()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Search rooms={[]}/>
       <div className="nav__menu">
        <Link to="/">
          Home
          </Link>
        <Link to="/rooms">
          Rooms
          </Link>
        <Link to="/chat">
          Chat
          </Link>
        <Link to="/contact">
          Contact
        </Link>
        <div className="nav__profile">
          <div className="nav__profile-img" onClick={()=>handleMenu()}>
            <img src='/user.png' alt={'profile'}/>
          </div>
          <div className="nav__profile-menu" ref={menuRef}>
              <Link to="/profile">Profile</Link>
              <Link to="/users">Users</Link>
              <a href="#" onClick={()=>{
                apiActions.logout()
              }}>Logout</a>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Nav
