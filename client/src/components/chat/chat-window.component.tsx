import React, { useState } from 'react'

interface Message{
  sender:string;
  reciver:string;
  message:string;
  date:string;
}

const Window = () => {
  const date = new Date().toUTCString()
  const [message,setMessage] = useState<string>('')
  const [tempMessages,setTempMessages] = useState<Message[]>([
    {
      sender:'Anna',
      reciver:'Dominik',
      message:message,
      date:date
    }
  ])

  const handleChange = (e:any) =>{
    setMessage(e.target.value)
  }

  const handleSubmit  = (e:any) => {
    e.preventDefault()
    let tmp = [...tempMessages]
    const date = new Date().toUTCString()
    tmp.push({
      sender:'Dominik',
      reciver:'Anna',
      message:message,
      date:date
    })
    setTempMessages(tmp)
    setMessage('')
    setTimeout(() => {
      const date = new Date().toUTCString()
      tmp.push({
        sender:'Anna',
        reciver:'Dominik',
        message:'Response',
        date:date
      })
      setTempMessages(tmp)
    }, 2000);
  }

  return (
    <div className='chat__window'>
      <div className="chat__window-header">
        <h2 className="chat__window-title">CZATEX</h2>
        <h2 className="chat__window-room">Room: <span className="chat__window-yellowgreen">Next</span></h2>
      </div>
      <div className="chat__window-messages">
        {tempMessages.map((m,i) =>{
          return(
            <div className={`chat__window-message ${i % 2 === 0 ? 'sender' : 'reciver'}`}>
              <p className='chat__window-message-msg'>{m.message}</p>
              <p className='chat__window-message-user-and-date'>{m.sender} {m.date}</p>
            </div>
          )
        })}
      </div>
      <div className="chat__window-controls">
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
          <div className="chat__window-message-field">
            <textarea onChange={(e)=>handleChange(e)} value={message} />
          </div>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Window
