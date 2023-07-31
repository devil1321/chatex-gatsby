import React from 'react'

interface RoomProps{
    room:string;
    date:string;
}

const Room:React.FC<RoomProps> = ({room,date}) => {
  return (
    <div className='profile__room'>
      <h3>{room}</h3>
      <p>{date}</p>
    </div>
  )
}

export default Room
