import '../styles/test.css'
import React, { useState } from 'react'

function Test() {
    const [selectedImages, setselectedImages] = useState([])
    const onSelectFile = (event) =>{
        const selectedFiles = event.target.files;
        console.log(selectedFiles);
        console.log(Array.isArray(selectedFiles))
        const selectedFilesArray = Array.from(selectedFiles); // turn selectedFiles from object to array
        const imagesArray = selectedFilesArray.map((file)=>{
            return URL.createObjectURL(file)
        })  
        console.log(imagesArray)
        // setselectedImages(imagesArray)
        setselectedImages((previousImages)=> previousImages.concat(imagesArray))
        // @param items — Additional arrays and/or items to add to the end of the array.
        event.target.value = "";
    }
  
  return (
    <section>
        <label >
            + Add Images
            <span>up to 10 images</span>
       
        <input type='file' name='images' onChange={onSelectFile} multiple accept='image/png, image/jpeg, image/webp, image/jpg'></input>
        </label>
        <div className="images">
            {
                selectedImages &&
                selectedImages.map((item, index)=>{
                    return(
                        <div key={item} className='image'>
                            <img src={item} alt="" height={200}/>
                            <button onClick={()=>setselectedImages(selectedImages.filter((e)=>e!==item))}>delete image</button>
                            {/* set lại list đã được lọc qua filter. List là các object lại khác với object bắn event vào. */}
                            <p>{index+1}</p>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Test