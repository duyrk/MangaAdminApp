import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form } from 'react-router-dom';
function Addchapter() {
  const [selectedImages, setselectedImages] = useState([])
  const [title, settitle] = useState("")
  const [chapterNumber, setchapterNumber] = useState("")
  function handleTitle(e) {
    console.log(e.target.value)
    settitle(e.target.value);
  }
  function handleChapterNumber(e) {
    setchapterNumber(e.target.value);
  }
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    console.log(Array.isArray(selectedFiles))
    const selectedFilesArray = Array.from(selectedFiles); // turn selectedFiles from object to array
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    console.log(imagesArray)
    // setselectedImages(imagesArray)
    setselectedImages((previousImages) => previousImages.concat(imagesArray))
    // @param items — Additional arrays and/or items to add to the end of the array.
    event.target.value = "";
  }
  const handleDeleteAll = () => {
    setselectedImages([])
  }
  return (


    <div className='addChapter-container'>
      <div className='addChapter-label'>
        <h2>Add Chapter</h2>
        <Button sx={{ width: "15%", alignSelf: "flex-end" }} type="submit" variant="contained">Submit</Button>

      </div>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label>Title:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Title..." onChange={handleTitle} />
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label>Chapter Number:</BoostForm.Label>
        <BoostForm.Control type="number" placeholder="chapter number..." onChange={handleChapterNumber}/>
      </BoostForm.Group>

      <section>

        <label className='testLabel'>
          + Add Manga Pages


          <input className='testInput' type='file' name='images' onChange={onSelectFile} multiple accept='image/png, image/jpeg, image/webp, image/jpg'></input>
        </label>
        {
          selectedImages.length > 0 && <Button sx={{ width: "15%", alignSelf: "flex-end", marginBottom: 3 }} type="button" variant="contained" color='error' onClick={handleDeleteAll}>Delete All</Button>
        }
        <div className="images">

          {

            selectedImages &&
            selectedImages.map((item, index) => {
              return (
                <div key={item} className='image'>
                  <img className='testImg' src={item} alt="" height={200} />
                  <button className='deleteButton' onClick={() => setselectedImages(selectedImages.filter((e) => e !== item))}>X</button>
                  {/* set lại list đã được lọc qua filter. List là các object lại khác với object bắn event vào. */}
                  <p>Page: {index + 1}</p>
                </div>
              )
            })
          }

        </div>
      </section>
    </div>

  )
}

export default Addchapter