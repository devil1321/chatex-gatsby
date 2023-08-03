import React, { useEffect } from 'react'
import Seo from './seo.component';
import Sidebar from './sidebar.component';
import Nav from './nav.component';
import Footer from './footer.component';
import '../../theme/styles.scss'

import { navigate } from 'gatsby';
import * as ApiActions from '../..//controller/actions-creators/api.actions-creators'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

interface LayoutProps{
    title:string;
    className:string;
    children:any;
}

const LayoutWithSidebar:React.FC<LayoutProps> = ({title,className,children}) => {

  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)
  
  useEffect(()=>{
    if(typeof window !== undefined){
        const token = localStorage.getItem('access_token')
        if(token !== null && token !== undefined && token !== 'null' && token !== 'undefined'){
            apiActions.isLogged()
        }else{
          navigate('/login')
        }
    }
  },[])

  
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
