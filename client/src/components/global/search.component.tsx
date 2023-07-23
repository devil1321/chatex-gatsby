import { Link } from 'gatsby'
import React, { useRef, useState, MutableRefObject } from 'react'

interface SearchProps{
    rooms:string[]
}

const Search:React.FC<SearchProps> = ({rooms}) => {

  const [matches,setMatches] = useState<string[]>([])
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleChange = (e:any) =>{
    const match = new RegExp(`^${e.target.value}`,'i')
    const matches = rooms.filter(r => {
        return match.test(r)
    })
    if(e.target.value === ''){
        wrapperRef.current.classList.add('empty')
        wrapperRef.current.classList.remove('fullfilled')
        setTimeout(() => {
            setMatches([])
            wrapperRef.current.style.maxHeight = '0px'
        }, 300);
    }else{
        setMatches(matches)
        wrapperRef.current.style.maxHeight = '9999px'
        wrapperRef.current.classList.add('fullfilled')
        wrapperRef.current.classList.remove('empty')
    }
  }

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    setMatches([])
  }

  return (
    <div className='search'>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <div className="search__field">
            <input type="text" name="search" onChange={(e)=>handleChange(e)}/>
            <button type='submit'>Join</button>
        </div>
      </form>
      <div className="search__matches-wrapper" ref={wrapperRef}>
        <div className="search__matches">
         {matches.map(m => {
             return(
                 <div className="search__match">
                     <Link to="/chat">{m}</Link>
                 </div>
             )
         })}
        </div>
      </div>
    </div>
  )
}

export default Search
