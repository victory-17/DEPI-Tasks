import {useState} from "react";

export default function Form({onAddItems}) {
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(1);



    const handleSubmit = (event) => {
        event.preventDefault();
        if (!description) return;
        const newItem = {
            description, quantity, packed: false, id: Date.now()
        }

        onAddItems(newItem);
        // handleAddItems(newItem);

        console.log(newItem)
        setQuantity(1);
        setDescription("");

    }

    return (
        <form className={"add-form"} onSubmit={handleSubmit}>
            <h3>What do you need for your Trip?</h3>
            <select name="quantity" id="quantity" value={quantity} onChange={(event) => {
                setQuantity(Number(event.target.value))
            }}>
                {Array.from({length: 30}, (_, i) => i + 1)
                    .map(num => (<option value={num} key={num}>{num}</option>))

                }
            </select>
            <input id={"description"} name={"description"} type="text" placeholder="Item..." value={description}
                onChange={(event) => {
                    setDescription(event.target.value)
                }}/>
            <button type={"submit"}>Add</button>

        </form>
    );
}
