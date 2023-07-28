import React from 'react'
import useImageData from '../../hooks/useImageData'
import { GatsbyImage } from 'gatsby-plugin-image'

const Intro = () => {

  const [image,setImage] = useImageData('friends.png')

  return (
    <div className='home__intro'>
      <div className="home__intro-text">
        <h2>About Us</h2>
        <p>At Chatex, we believe that communication is the key to building strong and lasting connections. Our Chat Page is designed to provide you with a seamless and interactive platform to engage with others, exchange ideas, seek assistance, and discover new insights.</p>
      </div>
      <div className="home__intro-img">
        {image && <GatsbyImage image={image.img} alt={image.name} />}
      </div>
    </div>
  )
}

export default Intro
