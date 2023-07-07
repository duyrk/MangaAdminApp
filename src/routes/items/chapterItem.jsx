import React from 'react'
import { Form, Link, useParams } from 'react-router-dom'
function ChapterItem(props) {
    const {data} = props;
    const { mangaId } = useParams();
  return (
    <div className='chapterItem-container' style={{marginBottom:'20px'}}>
<Link to={`/cpanel/manga/${mangaId}/edit/chapter/${data._id}`}>Chapter {data.chapter_number}: {data.title}</Link>
    </div>
    
  )
}

export default ChapterItem