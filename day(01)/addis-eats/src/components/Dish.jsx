import React from 'react'

function Dish(props){

    return(
        <div>
            <h2>{props.name}</h2>
            <p>{props.price}</p>
        </div>
    )
}

export default Dish