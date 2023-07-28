import React from 'react'

interface SearchProps{
    users:{
        name:string;
        isOnline:boolean;
    }[]
    onChange:(val:string) => any;
}

const Search:React.FC<SearchProps> = () => {
  return (
    <div>
      
    </div>
  )
}

export default Search
