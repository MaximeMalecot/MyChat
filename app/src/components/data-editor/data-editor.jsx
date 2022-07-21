import React, {useState} from "react";
import styles from "./data-editor.module.scss";

export default function DataEditor ({data, handler, deleter}){
    const [edited, setEdited] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [localValue, setLocalValue] = useState(data.name);

    const handleChange = (e) => {
        setEdited(true);
        setLocalValue(e.target.value);
    }

    const apply = () => {
        handler(data.id, localValue);
        setEdited(false);
    }

    const deleteData = () => {
        if(deleter(data.id)){
            setDeleted(true);
        }
    }
    if(deleted) return null;

    return(
        <div className={styles.main}> 
            <input onChange={handleChange} value={localValue}/>
            <div className={styles.buttons}>
                { edited && <button onClick={apply} className="btn green">Apply</button>}
                <button onClick={deleteData} className="btn red">Delete</button>
            </div>
        </div>
    )
}