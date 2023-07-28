import React,{useState} from 'react'
import { GlobalComponents } from '../components/global'
import { UsersComponents } from '../components/users'

interface UserState{
  name:string;
  isOnline:boolean
}


const Users = () => {

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

  return (
    <GlobalComponents.Layout title='Users' className='users'>
      <div className="users__inner-wrapper">
        <UsersComponents.Search users={users} onChange={handleChange} />
        {matches.map(u => <UsersComponents.User user={u} />)}
      </div>
    </GlobalComponents.Layout>
  )
}

export default Users
