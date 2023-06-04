import React, { useState } from 'react'
import MangaInfoItem from './items/mangaInfoItem'
import { Form } from 'react-router-dom'
import { useStateManager } from 'react-select'
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
    const [mangaData, setmangaData] = useState(data)
    const handleSearch = (e) =>{
        console.log(e.target.value);
        //handle search here
    }
  return (
    <div className='dashboard'>
             <Form className="searchForm" role="search">
        <div>
          <img src="../assets/ic_search.png" alt="searchImg" />
        </div>
        <input type="search" id="q" name="q" placeholder="Search..." onChange={handleSearch}/>
      </Form>
        {
            mangaData.map(item=><MangaInfoItem></MangaInfoItem>)
        }
 
    </div>
   
  )
}
