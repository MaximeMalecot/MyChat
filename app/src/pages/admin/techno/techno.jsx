import React, { useState, useEffect } from "react";
import styles from './techno.module.scss';
import { useAppContext } from "../../../contexts/app-context";
import TechnoService from "../../../services/techno.service";
import DataEditor from "../../../components/data-editor/data-editor";
import { toast } from 'react-toastify';

export default function Techno() {
	const [technos, setTechnos] = useState([]);
	const { appState } = useAppContext();
	const [name, setName] = useState('');
	useEffect(() => {
		TechnoService
		.getAll()
		.then((res) => setTechnos(res))
		.catch(console.error);
	}, []);

	const handleChange = async (id, name) => {
		let res = await TechnoService.modify(id, name);
		if(!res){
			toast.error("Couldn't modify techno, try again later fdp", {
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
		let res = await TechnoService.delete(id);
		if(!res){
			toast.error("Couldn't modify techno, try again later fdp", {
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
		const techno = await TechnoService.create(name);
		if(!techno){
			toast.error("Couldn't add techno", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
		} else {
			setTechnos([...technos, techno]);
			setName('');
		}
	};

	return (
		<div>
		<div className={styles.container}>
			<h1>Creation de technos</h1>
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
		{ technos.length > 0 ? 
			<div className={styles.listContainer}>
				<div className={styles.list}>
				{
					technos.map((techno,index) =>
						<DataEditor data={techno} key={index} handler={handleChange} deleter={handleDelete}/>
					) 
				}
				</div>
			</div>
		: null
		}
		</div>
	);
}
