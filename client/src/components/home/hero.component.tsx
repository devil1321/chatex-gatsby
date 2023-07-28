import React from 'react'
import useImageData from '../../hooks/useImageData'
import { GatsbyImage } from 'gatsby-plugin-image'

const Hero = () => {
  const [image,setImage] = useImageData('cartoon.png')
  return (
    <div className='home__hero'>
      <div className="home__hero-text">
        <h1>Chatex</h1>
        <h3>Join To Us And Talk About Everything</h3>
        <p>People around the world</p>
      </div>
      <div className="home__hero-img">
        {image && <GatsbyImage image={image.img} alt={image.name} />}
      </div>
    </div>
  )
}

export default Hero
