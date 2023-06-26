import { Button } from '@mui/material'
import React from 'react'

function MangaInfoItem(props) {
  const {data} = props;
  return (

    <div className='itemContainer-info'>
      <div className='manga-cover'>
        <img src="https://i7.xem-truyen.com/manga/0/70/566.thumb_500x.jpg" alt="" />
      </div>
      <div className='infoContainer'>
          <div>
            <h4>Name: {data.name}</h4>
            <h4>Author: {data.author}</h4>
            <h4>Status: {data.status}</h4>
            <h4>Like: {data.likes}</h4>
            <h4>Views: {data.views}</h4>
          </div>
          <div>
          <h4>Uploader: {data.uploader.name}</h4>
            <h4>Lastest Chapter: {data.chapter.length > 0 ? data.chapter[0].chapter_number : 0}</h4>
          
           
          </div>
          <div className='buttonContainer-info'> 
          
         <Button variant='contained'>Edit</Button>
          </div>
      </div>
    </div>
  )
}

export default MangaInfoItem