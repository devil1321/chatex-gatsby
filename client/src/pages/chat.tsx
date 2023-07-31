import React, { useEffect } from 'react'
import { GlobalComponents } from '../components/global'
import { ChatComponents } from '../components/chat'

const Chat = () => {

  return (
    <GlobalComponents.LayoutWithSidebar title='Chat' className='chat'>
      <div className="chat__inner-wrapper">
        <ChatComponents.Nav />
        <div className="chat__wrapper">
          <ChatComponents.Window />
          <ChatComponents.Users />
        </div>
      </div>
    </GlobalComponents.LayoutWithSidebar>
  )
}

export default Chat
