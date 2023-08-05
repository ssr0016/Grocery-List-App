import React, { useState } from 'react'
import { v4 as uuid } from "uuid";
import GroceryItemComponent from './GroceryItemComponent';
import { useRef } from 'react';

const GroceryComponent = () => {
    //it is for input
    const [item, setItem] = useState("");
    //this is for list of items
    const [groceryItems, setGroceryItems] = useState([]);
    //ito ay para empty input...validation
    const [errors, setErrors] = useState("");
    const inputRef = useRef();
    

    const handleAddItem = () => {
      if(item){
        setGroceryItems([...groceryItems, {id: uuid(), name: item}]);
        setItem("");
        setErrors("");
      }else{
        setErrors("Grocery item cannot be empty!.");
        inputRef.current.focus();
      } 
    };

    const handleEditItem = (id, newItem) => {
      const updatedGroceryItems = groceryItems.map((item) =>{
        if(item.id ===  id){
          return {...item, name: newItem};
        }
        return item;
      });
      setGroceryItems(updatedGroceryItems);
    }

    const handleDeleteItem = (removeId) => {
      const filteredItems = groceryItems.filter((item) => item.id !== removeId);
      setGroceryItems(filteredItems);
    };

    const handleClearItems = () => {
      setGroceryItems([]);
    }

  return (
    <div className="grocery-body">
        <h1>Grocery List</h1>
        <div className="input-section">
            <div className='input-container'>
                <input
                 ref={inputRef}
                type="text" placeholder="Enter an item..." value={item}
                  onChange={(event) => setItem(event.target.value)} />
                <button onClick={handleAddItem} className="btn-add">Add Item</button>
            </div>
            <div>{errors ? <p className="errors">{errors}</p> : null}</div>
        </div>
         <ul className="grocery-list">
              {groceryItems.map((item) => (
                  <GroceryItemComponent 
                  key={item.id} 
                  item={item}
                   handleEditItem={handleEditItem}
                   handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
      {groceryItems.length > 0 ? (
          <button onClick={handleClearItems}
           className="btn-clear">Clear Grocery Items{" "}</button>
      ) : null}
    </div>
  )
}

export default GroceryComponent