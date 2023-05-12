import React from 'react'
import MangaInfoItem from './items/mangaInfoItem'
const data =[
    {
        "_id":"1",
        "cover":"",
        "name":"Nise Koi",
        "Author": "Komi Naoshi",
        "Status":"Finished",
        "Like":2951,
        "Views":9804536,
        "Uploader":"Admin Team",
        "Latest Chapter": "229.6"

    },
    {
        "_id":"2",
        "cover":"",
        "name":"Nise Koi",
        "Author": "Komi Naoshi",
        "Status":"Finished",
        "Like":2951,
        "Views":9804536,
        "Uploader":"Admin Team",
        "Latest Chapter": "229.6"

    },
    {
        "_id":"3",
        "name":"Nise Koi",
        "Author": "Komi Naoshi",
        "Status":"Finished",
        "Like":2951,
        "Views":9804536,
        "Uploader":"Admin Team",
        "Latest Chapter": "229.6"

    },
    {
        "_id":"4",
        "cover":"",
        "name":"Nise Koi",
        "Author": "Komi Naoshi",
        "Status":"Finished",
        "Like":2951,
        "Views":9804536,
        "Uploader":"Admin Team",
        "Latest Chapter": "229.6"

    }
]
export default function Dashboard() {
  return (
    <div className='dashboard'>
        {
            data.map(item=><MangaInfoItem></MangaInfoItem>)
        }
 
    </div>
   
  )
}
