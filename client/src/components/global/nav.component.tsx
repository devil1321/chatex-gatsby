import React,{ useState,useRef, MutableRefObject } from 'react'
import { Link } from 'gatsby'
import Search from './search.component'

const Nav = () => {

  const [isProfile,setIsProfile] = useState<boolean>(false)
  const [isClicked,setIsClicked] = useState<boolean>(false)
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>

  const rooms = [
    "Chatterbox Central",
    "Friendly Hangout",
    "Ageless Connections",
    "Global Chit-Chat",
    "Lifelong Conversations",
    "Fun Chat Lounge",
    "All-Age Social Circle",
    "Infinite Interactions",
    "Chatlandia",
    "Diverse Discussions",
    "Open Minds Forum",
    "Universal Chat Hub",
    "People's Parley",
    "Community Exchange",
    "Timeless Talks",
    "Multigenerational Banter",
    "Everybody Talks",
    "The Chat Commons",
    "InterAge Dialogues",
    "Inclusive Interaction",
    "Worldly Whispers",
    "Social Spectrum",
    "Age-Free Exchange",
    "The Conversation Patch",
    "United Chatscape",
    "Global Talk Haven",
    "Cross-Generational Exchange",
    "Friendly Folks Forum",
    "The Everlasting Chat",
    "Mixed Age Melody"
  ]

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
      <Search rooms={rooms}/>
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
              <Link to="#" onClick={()=>handleLogout()}>Logout</Link>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Nav
