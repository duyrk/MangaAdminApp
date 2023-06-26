import React, { useEffect, useState } from 'react'
import MangaInfoItem from './items/mangaInfoItem'
import { Form, useNavigate } from 'react-router-dom'
import { useStateManager } from 'react-select'
import { useSelector } from 'react-redux'
import axios from 'axios'
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
    const [mangaData, setmangaData] = useState([])
    const navigate = useNavigate();
    const handleSearch = (e) =>{
        console.log(e.target.value);
        //handle search here
    }
    const token = useSelector(state=>state.persistedReducer.auth.token.accessToken)
    const getAllMangaApi = async ()=>{ 

            let headersList = {
              Accept: "*/*",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            };
            let reqOptions = {
              url: "http://localhost:3000/cpanel/manga",
              method: "GET",
              headers: headersList,

            };
            try {
              let response = await axios.request(reqOptions);
              console.log(response.data.data);
              setmangaData(response.data.data);
            } catch (error) {
              console.log("Call login error" + error);
            }
       
    }
    useEffect(() => {
    getAllMangaApi();
    }, [])
    
  return (
    <div className='dashboard'>
             <Form className="searchForm" role="search" style={{borderRadius:10}}>
        <div>
          <img src="../assets/ic_search.png" alt="searchImg" />
        </div>
        <input type="search" id="q" name="q" placeholder="Search..." onChange={handleSearch}/>
      </Form>
        {
            mangaData.map(item=><MangaInfoItem key={item._id} data={item}></MangaInfoItem>)
        }
 
    </div>
   
  )
}
