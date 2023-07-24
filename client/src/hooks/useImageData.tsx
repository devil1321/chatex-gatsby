import React,{ useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { IGatsbyImageData } from 'gatsby-plugin-image'

interface Node{
  node:{
    name:string;
    extension:string;
    childrenImageSharp:{
      gatsbyImageData:IGatsbyImageData;
    }[]
  }
}

interface Query{
    allFile:{
        edges:Node[]
    }
}

interface State{
    name?:string;
    img?:IGatsbyImageData | undefined;
}

const useImageData = (name:string,index?:number) => {

    const [image,setImage] = useState<State | any>({})
    const [isInit,setIsInit] = useState<boolean>(false)

    const data:Query = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            name
            extension
            childrenImageSharp {
              gatsbyImageData(formats: WEBP, layout:FULL_WIDTH)
            }
          }
        }
      }
    }
  `)

  const handleFind = (data:Query,name:string) =>{
    const images = data.allFile.edges
    const objects = images?.filter(o => o.node.name + '.' + o.node.extension === name)
    if(index){
      setImage({
        name:objects[index].node.name,
        img:objects[index].node.childrenImageSharp[0].gatsbyImageData
      })
    }else{
      setImage({
        name:objects[0]?.node?.name,
        img:objects[0]?.node?.childrenImageSharp[0]?.gatsbyImageData
      })
    }
    setIsInit(true)
  }

  useEffect(()=>{
    handleFind(data,name)
  },[isInit])
  

  return [image,setImage]
}

export default useImageData
