import React from 'react'
import LineItem from './LineItem'

const ItemList = (props) => {

  const {items, handleCheck, handleDelete} = props

  return (
    
    <ul>

        {items.map( item => (
            <LineItem 
                key = {item.id}
                item = {item}
                handleCheck = {handleCheck}
                handleDelete = {handleDelete}
            />
        ))}

    </ul>

  )
}

export default ItemList