import {useState, useEffect} from "react";
import Item from "./items";

function PackingList({items, onDeleteItem, onPackedItem, onClearListItems}) {
    const [sortBy, setSortBy] = useState('input');
    let sortedItems;

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    if (sortBy === 'input') {
        sortedItems = items
    }

    if (sortBy === 'description') {
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
    }

    if (sortBy === 'packed') {
        sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
    }


    return (<div className={"list"}>
            <ul>
                {sortedItems.map(item => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem}/>))}
            </ul>
            <div className="actions">
                <select name="action" id="action" value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}>
                    <option value="input">Sort by Input Order</option>
                    <option value="packed">Sort by Packed Status</option>
                    <option value="description">Sort by Description</option>
                </select>
                <button onClick={onClearListItems} className="clear-btn">Clear List</button>
            </div>
        </div>

    );
}
export default PackingList;
