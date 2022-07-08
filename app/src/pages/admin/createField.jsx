import React, { useState } from 'react';
import styles from './filiere.module.scss';
import {API} from '../../constants/base';

export default function Filiere(){
    const [name, setName] = useState('cegenredefiliere');
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return(
        <div className={styles.container}>
            <h1>Creation de filière</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="name"> Name :</label>
                <input id='name' onChange={(e) => {setName(e.target.value)}} type="text"/>
                <button type='submit'>Créer</button>
            </form>
        </div>
    )
}