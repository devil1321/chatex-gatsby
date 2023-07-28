import { Link } from 'gatsby'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer__logo">
        <h2>Chatex</h2>
        <p>All rights reserved</p>
      </div>
      <div className="footer__list">
        <Link to="/" >Home</Link>
        <Link to="/rooms" >Rooms</Link>
        <Link to="/chat" >Chat</Link>
        <Link to="/contact" >Contact</Link>
      </div>
      <div className="footer__contact">
        <form action="">
          <label htmlFor="">Contact With Us</label>
          <input type="text" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Footer
