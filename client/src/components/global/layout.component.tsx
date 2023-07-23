import React from 'react'
import Seo from './seo.component';
import Nav from './nav.component';
import Footer from './footer.component';
import '../../theme/styles.scss'

interface LayoutProps{
    title:string;
    className:string;
    children:any;
}

const Layout:React.FC<LayoutProps> = ({title,className,children}) => {
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
