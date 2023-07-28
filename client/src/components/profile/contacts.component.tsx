import React, { useState,useEffect } from 'react'

interface UserState{
    name:string;
    isOnline:boolean
}

const Contacts = () => {
  const [users,setUsers] = useState<UserState[]>([
    {name:'Anna', isOnline:true},
    {name:'Todd', isOnline:false},
    {name:'Michal', isOnline:true},
    {name:'Jacek', isOnline:false},
    {name:'Magda', isOnline:true},
    {name:'Asia', isOnline:true},
  ])
  const [matches,setMatches] = useState<UserState[]>(users)

  const handleChange = (e:any) => {
    const users_nodes = document.querySelectorAll('.profile__contact') as NodeListOf<HTMLDivElement>
    users_nodes.forEach(n => {
      n.style.transition = 'all 0s ease-in-out'
      n.style.transform = 'translateX(-500px)'
    })
    if(e.target.value.length === 0){
      setMatches([...users])
    }else{
      const tmp = users.filter(u => {
        const regExp = new RegExp(`^${e.target.value}`,'i')
        return regExp.test(u.name)
      })
      setMatches(tmp)
    }
  }

  const handleAnimation = (startTime:number,delay:number):void =>{
    const users = document.querySelectorAll('.profile__contact') as NodeListOf<HTMLDivElement>
    users.forEach(user => {
      setTimeout(() => {
        user.style.transition = 'all 0.3s ease-in-out'
        user.style.transform = 'translateX(0px)'
      }, startTime += delay)
    })
  }

  useEffect(()=>{
    handleAnimation(0,100)
  },[matches])
  return (
    <div className='profile__contacts'>
      {matches.map((u,i) =>{
        return(
            <div key={i} className={`profile__contact ${u.isOnline ? 'online' : 'offline'}`}>{u.name}</div>
        )
      })}
      <div className="profile__contacts-search">
        <form action="">
          <div className="profile__contacts-field">
            <input type="text" onChange={(e)=>{handleChange(e)}} />
          </div>
          <button type='submit'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default Contacts
