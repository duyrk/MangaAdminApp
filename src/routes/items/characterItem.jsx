import React from 'react'

export default function CharacterItem(props) {
    const {data} = props;
  return (
    <div className='characterItem'>
        <img width={'50%'} src={data.image}></img>
        <div className='characterInfo'>
            <div>Name: {data.name}</div>
            <div>About Character: {data.description}</div>
        </div>
    </div>
  )
}
