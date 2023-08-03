import React, { useEffect } from 'react'
import Seo from './seo.component';
import Sidebar from './sidebar.component';
import Nav from './nav.component';
import Footer from './footer.component';
import '../../theme/styles.scss'

import { navigate } from 'gatsby';
import * as ApiActions from '../..//controller/actions-creators/api.actions-creators'
import { bindActionCreators } from 'redux';
import { useDispatch,useSelector } from 'react-redux';
import { State } from '../../controller/reducers'

interface LayoutProps{
    title:string;
    className:string;
    children:any;
}

const LayoutWithSidebar:React.FC<LayoutProps> = ({title,className,children}) => {

  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)
  const { user,access_token } = useSelector((state:State) => state.api)
  
  useEffect(()=>{
    if(typeof window !== undefined){
        if(!user && !access_token){
            apiActions.isLogged()
        }else{
          navigate('/login')
        }
    }
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
