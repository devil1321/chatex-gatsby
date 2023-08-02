import React, { useEffect, useState } from 'react'
import Seo from './seo.component';
import Sidebar from './sidebar.component';
import Nav from './nav.component';
import Footer from './footer.component';
import '../../theme/styles.scss'

import { useSelector,useDispatch } from 'react-redux'
import { State } from '../../controller/reducers';
import { bindActionCreators } from 'redux'
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'
import { navigate } from 'gatsby';


interface LayoutProps{
    title:string;
    className:string;
    children:any;
}

const LayoutWithSidebar:React.FC<LayoutProps> = ({title,className,children}) => {
  
  const { user } = useSelector((state:State) => state.api)
  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)

  const [isSet,setIsSet] = useState<boolean>(false)
  
  useEffect(() => {
    if(!isSet){
      apiActions.isLogged()
      setIsSet(true)
    }
    if(user?.email && isSet){
      localStorage.setItem("isLogged","true")
    }
  }, [isSet,user])

  useEffect(()=>{
    setTimeout(() => {
      if(isSet){
        if(!user?.email){
          const isLogged = localStorage.getItem('isLogged')
          if(isLogged === 'true'){
            apiActions.isLogged()
          }else{
            navigate('/login')
          }
        }
      }
    }, 100);
  },[user])


  return (
    <div className={className}>
        <Seo title={title} meta={[]}/>
        <Nav />
        <Sidebar />
        {children}
        <Footer />
    </div>
  )
}

export default LayoutWithSidebar
