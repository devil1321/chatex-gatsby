import React from 'react'

interface UserProps{
    user:{
        name:string;
        isOnline:boolean;
    }
}

const User:React.FC<UserProps> = ({user}) => {
  return (
    <div className={`users__user ${user.isOnline ? 'online' : 'offline'}`}>
      <div className="users__user-img">
        <img src="/user.png" alt="" />
      </div>
      <p>{user.name}</p>
      <div className="users__user-menu">
        <button>Info</button>
        <button>Chat</button>
      </div>
    </div>
  )
}

export default User
