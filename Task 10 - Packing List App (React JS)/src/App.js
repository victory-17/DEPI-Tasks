import Header from "./components/Header";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import {useState, useEffect} from "react";
import Swal from 'sweetalert2';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items'));
        if (storedItems) {
            setItems(storedItems);
        }
    }, []);

    function handleAddItems(item) {
        const updatedItems = [...items, item];
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    }

    function handleDeleteItem(id) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    }

    function handleClearListItems() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete All items!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete all items!'
        }).then((result) => {
            if (result.isConfirmed) {
                setItems([]);
                localStorage.removeItem('items');
                Swal.fire({
                    title: 'Items Deleted',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    function handlePackedItem(id) {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, packed: !item.packed } : item
        );
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    }

    return (
        <main className={"app"}>
            <Header/>
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items}
                        onDeleteItem={handleDeleteItem}
                        onPackedItem={handlePackedItem}
                        onClearListItems={handleClearListItems}/>
            <Stats items={items}/>
        </main>
    );
}

export default App;
