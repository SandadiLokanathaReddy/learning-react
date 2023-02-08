import Header from "./Components/Header";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import { useState } from "react";
import AddItem from "./Components/AddItem";
import SearchItem from "./Components/SearchItem";

function App() {
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("shoppingList"))
    );
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");

    const setAndSaveItems = (newItems) => {
        setItems(newItems);
        localStorage.setItem("shoppingList", JSON.stringify(newItems));
    };

    const addItem = (item) => {
        const myNewItem = {
            id: items.length ? items[items.length - 1].id + 1 : 1,
            checked: false,
            item: item,
        };
        const listItems = [...items, myNewItem];
        setAndSaveItems(listItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        // addItem
        addItem(newItem);
        setNewItem("");
    };

    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : { ...item }
        );
        setAndSaveItems(listItems);
    };

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setAndSaveItems(listItems);
    };

    return (
        <div className="App">
            <Header title="Grocery List" />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem search={search} setSearch={setSearch} />
            <Content
                items={items.filter((it) =>
                    it.item.toLowerCase().includes(search.toLowerCase())
                )}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
            <Footer length={items.length} />
        </div>
    );
}

export default App;
