import React from 'react'
import { GlobalComponents } from '../components/global'
import { ContactComponents } from '../components/contact'

const Contact = () => {
  return (
    <GlobalComponents.Layout title='Contact' className='contact'>
      <div className='contact__inner-wrapper'>
        <ContactComponents.Header />
        <ContactComponents.Form />
      </div>
    </GlobalComponents.Layout>
  )
}

export default Contact
