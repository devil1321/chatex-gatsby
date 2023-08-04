import React, { useEffect, useState } from 'react'
import Seo from './seo.component';
import Nav from './nav.component';
import Footer from './footer.component';
import '../../theme/styles.scss'

import { useSelector,useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux';
import { State } from '../../controller/reducers';
import * as ApiActions from '../../controller/actions-creators/api.actions-creators'
import { navigate } from 'gatsby';


interface LayoutProps{
    title:string;
    className:string;
    children:any;
}

const Layout:React.FC<LayoutProps> = ({title,className,children}) => {

  const [isLoad,setIsLoad] = useState<boolean>(false)

  const dispatch = useDispatch()
  const apiActions = bindActionCreators(ApiActions,dispatch)
  const { user } = useSelector((state:State) => state.api)
  
  const handleRedirect = () =>{
    if(isLoad && !user){
      navigate('/login')
    }
  }

  useEffect(()=>{
    apiActions.isLogged()
    setTimeout(() => {
      setIsLoad(true)
    }, 1000);
  },[])

  useEffect(()=>{
    handleRedirect()
  },[isLoad,user])
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
