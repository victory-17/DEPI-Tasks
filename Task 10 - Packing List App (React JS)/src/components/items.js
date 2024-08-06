function Item({item, onDeleteItem, onPackedItem}) {
    const handlePackedItem = (itemId) => {
        onPackedItem(itemId);
        const updatedItems = JSON.parse(localStorage.getItem('items')) || [];
        const updatedItemIndex = updatedItems.findIndex((item) => item.id === itemId);
        if (updatedItemIndex !== -1) {
            updatedItems[updatedItemIndex].packed = !updatedItems[updatedItemIndex].packed;
            localStorage.setItem('items', JSON.stringify(updatedItems));
        }
    };

    return (
        <li className={"item"}>
            <input type="checkbox" value={item.packed} onChange={() => handlePackedItem(item.id)}/>
            <span style={item.packed ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}><i className="fas fa-times"></i></button>
        </li>
    );
}

export default Item;
