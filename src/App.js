import Header from "./Components/Header";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import AddItem from "./Components/AddItem";
import SearchItem from "./Components/SearchItem";

function App() {
	const API_URL = "http://localhost:3500/items";

	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState("");
	const [search, setSearch] = useState("");
	const [fetchError, setFetchError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) throw Error("Did not receive expected data");
				const listItems = await response.json();
				setItems(listItems);
				setFetchError(null);
			} catch (err) {
				setFetchError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		setTimeout(() => {
			(async () => await fetchItems())();
		}, 2000);
	}, []);

	const addItem = (item) => {
		const myNewItem = {
			id: items.length ? items[items.length - 1].id + 1 : 1,
			checked: false,
			item: item,
		};
		const listItems = [...items, myNewItem];
		setItems(listItems);
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
		setItems(listItems);
	};

	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);
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
			<main>
				{isLoading && <p>Loading Items...</p>}
				{fetchError && (
					<p style={{ color: "red" }}>{`Error : ${fetchError}`}</p>
				)}
				{!fetchError && !isLoading && (
					<Content
						items={items.filter((it) =>
							it.item.toLowerCase().includes(search.toLowerCase())
						)}
						handleCheck={handleCheck}
						handleDelete={handleDelete}
					/>
				)}
			</main>
			<Footer length={items.length} />
		</div>
	);
}

export default App;
