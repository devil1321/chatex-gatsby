import React from 'react'
import { Link } from 'gatsby'
import Search from './search.component'

const Nav = () => {

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
       </div>
    </div>
  )
}

export default Nav
