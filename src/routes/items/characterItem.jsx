import React from 'react'

export default function CharacterItem(props) {
    const {data} = props
  return (
    <div className='characterItem'>
        <img width={'20%'} src='https://i.pinimg.com/736x/97/a6/1a/97a61a11be4891d48327ea488f3bf5cb.jpg'></img>
        <div className='characterInfo'>
            <div>Name: Chitoge Kirisaki</div>
            <div>About Character: Chitoge is an attractive, slim fair-skinned young woman with waist-length blond hair that has pink tips at the end of her hair, strikingly aqua-blue eyes, stunning features and thanks to her natural figure, many people associate her with a supermodel.</div>
        </div>
    </div>
  )
}
