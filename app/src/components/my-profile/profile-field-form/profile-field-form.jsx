import React, { useEffect, useState } from "react";
import FieldService from "../../../services/field.service";
import styles from './profile-field-form.module.scss';
import { toast } from 'react-toastify';

export default function ProfileFieldForm({userField}) {
    const [field, setField] = useState([]);
    const [selectedField, setSelectedField] = useState([]);
    useEffect(() => {
        FieldService.getAll()
            .then(res => {
                setField(res);
            })
            .catch(console.error);
        setSelectedField(userField);
    }, []);

    const handleSelect = (e) => {
            setSelectedField(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let res = FieldService.modifySelfField(selectedField);
        if(!res){
            toast.error("Couldn't modify user, try again later", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        toast.success("Account updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div>
            <select name="field" onChange={handleSelect} value={selectedField}>
                <option value='null'>---</option>
                {field.map(field => (
                    <option key={field.id} value={field.id}>{field.name}</option>
                ))}
            </select>
            <button onClick={handleSubmit} className="btn green">Edit</button>
        </div>

    ) 
}