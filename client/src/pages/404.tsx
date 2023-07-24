import * as React from "react"
import { Link,PageProps } from "gatsby"
import useImageData from "../hooks/useImageData"
import { GatsbyImage } from "gatsby-plugin-image"


const NotFoundPage: React.FC<PageProps> = () => {
  const [image,setImage] = useImageData('404.webp')
  return (
    <div className="page_error">
      {image && <GatsbyImage image={image.img} alt={image.name} />}
      <Link to="/">
        <button>Go To Home</button>  
      </Link>.
    </div>
  )
}

export default NotFoundPage

