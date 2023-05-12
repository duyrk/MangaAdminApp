import React from 'react'
import { Link } from 'react-router-dom'
function ChapterItem(props) {
    const {data} = props
  return (
    <div className='chapterItem-container'>
<Link to={"/"}>Chapter {data.chapterNumber}: {data.chapterName}</Link>
    </div>
    
  )
}

export default ChapterItem