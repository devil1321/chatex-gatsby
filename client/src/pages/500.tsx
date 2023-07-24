import React from 'react'
import useImageData from '../hooks/useImageData'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const server_error_500 = () => {
  const [image,setImage] = useImageData('500.webp')
  return (
    <div className="page_error">
      {image && <GatsbyImage image={image.img} alt={image.name} />}
      <Link to="/">
        <button>Go To Home</button>  
      </Link>.
    </div>
  )
}

export default server_error_500