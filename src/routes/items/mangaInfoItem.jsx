import { Button } from '@mui/material'
import React from 'react'

function MangaInfoItem() {
  return (

    <div className='itemContainer-info'>
      <div className='manga-cover'>
        <img src="https://i7.xem-truyen.com/manga/0/70/566.thumb_500x.jpg" alt="" />
      </div>
      <div className='infoContainer'>
          <div>
            <h4>Name: Nisekoi</h4>
            <h4>Author: Komi Naoshi</h4>
            <h4>Status: Finished</h4>
            <h4>Like: 2951</h4>
            <h4>Views: 9,804,536</h4>
          </div>
          <div>
          <h4>Uploader: Admin Team</h4>
            <h4>Lastest Chapter: 229.6</h4>
          
           
          </div>
          <div className='buttonContainer-info'> 
          
         <Button variant='contained'>Edit</Button>
          </div>
      </div>
    </div>
  )
}

export default MangaInfoItem