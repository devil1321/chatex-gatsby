import React,{useEffect, useState} from 'react'
import { GlobalComponents } from '../components/global'
import { UsersComponents } from '../components/users'

import { useSelector, useDispatch } from 'react-redux'
import { $CombinedState, bindActionCreators } from 'redux'
import * as ApiActions from '../controller/actions-creators/api.actions-creators'
import { State } from '../controller/reducers'
import { User } from '../controller/interfaces'



const Users = () => {

  const { users } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)
 
  const [matches,setMatches] = useState<User[]>(users)

  const handleChange = (e:any) => {
    const users_nodes = document.querySelectorAll('.profile__contact') as NodeListOf<HTMLDivElement>
    users_nodes.forEach(n => {
      n.style.transition = 'all 0s ease-in-out'
      n.style.transform = 'translateX(-500px)'
    })
    if(e.target.value.length === 0){
      setMatches([...users])
    }else{
      const tmp = users.filter((u:User) => {
        const regExp = new RegExp(`^${e.target.value}`,'i')
        return regExp.test(u.email)
      })
      setMatches(tmp)
    }
  }

  useEffect(() => {
    apiActions.getUsers()
  }, [])
  
  useEffect(()=>{
    setMatches(users)
  },[users])

  return (
    <GlobalComponents.Layout title='Users' className='users'>
      <div className="users__inner-wrapper">
        <UsersComponents.Search users={users} onChange={handleChange} />
        {matches.map(u => <UsersComponents.User key={u.email} user={u} />)}
      </div>
    </GlobalComponents.Layout>
  )
}

export default Users
