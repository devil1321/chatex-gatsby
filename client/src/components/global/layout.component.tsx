import React, { useEffect } from 'react'
import Seo from './seo.component';
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

const Layout:React.FC<LayoutProps> = ({title,className,children}) => {
  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)
  const { user } = useSelector((state:State) => state.api)
  
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
        {children}
        <Footer />
    </div>
  )
}

export default Layout
