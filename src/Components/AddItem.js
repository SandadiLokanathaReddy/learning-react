import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = (props) => {
    const inputRef = useRef();
    const { newItem, setNewItem, handleSubmit } = props;

    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item</label>
            <input
                autoFocus
                ref={inputRef}
                id="addItem"
                type="text"
                placeholder="Add Item"
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                aria-label="Add Item"
                type="submit"
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
    );
};

export default AddItem;
