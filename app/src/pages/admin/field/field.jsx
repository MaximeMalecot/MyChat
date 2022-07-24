import React, { useState, useEffect } from "react";
import styles from './field.module.scss';
import { useAppContext } from "../../../contexts/app-context";
import FieldService from "../../../services/field.service";
import DataEditor from "../../../components/data-editor/data-editor";
import { toast } from 'react-toastify';

export default function Field() {
	const [fields, setFields] = useState([]);
	const { appState } = useAppContext();
	const [name, setName] = useState('');
	useEffect(() => {
		FieldService
		.getAll()
		.then((res) => setFields(res))
		.catch(console.error);
	}, []);

	const handleChange = async (id, name) => {
		let res = await FieldService.modify(id, name);
		if(!res){
			toast.error("Couldn't modify field, try again later", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
		}
	}

	const handleDelete = async (id) => {
		let res = await FieldService.delete(id);
		if(!res){
			toast.error("Couldn't modify field, try again later", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
			return false;
		}
		return true;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const field = await FieldService.create(name);
		if(!field){
			toast.error("Couldn't add field", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
		} else {
			setFields([...fields, field]);
			setName('');
		}
	};

	return (
		<div>
		<div className={styles.container}>
			<h1>Creation d'une filière</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
			<label htmlFor="name"> Name :</label>
			<input
				id="name"
				onChange={(e) => {
				setName(e.target.value);
				}}
				value={name}
				type="text"
			/>
			<button type="submit">Créer</button>
			</form>
		</div>
		{ fields.length > 0 ? 
			<div className={styles.listContainer}>
				<div className={styles.list}>
				{
					fields.map((field,index) =>
						<DataEditor data={field} key={index} handler={handleChange} deleter={handleDelete}/>
					) 
				}
				</div>
			</div>
		: null
		}
		</div>
	);
}
