import React from 'react'
import { GlobalComponents } from '../components/global'

const Rooms = () => {

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
    <GlobalComponents.LayoutWithSidebar title="rooms" className='rooms'>
        <div className="rooms__wrapper">
            {rooms.map(r => {
              return(
                  <div className='rooms__room'>{r}</div>
                  )
            })}
        </div>
    </GlobalComponents.LayoutWithSidebar>
  )
}

export default Rooms
