import React, { useState } from 'react';
import styles from './index.module.scss';

export default function MonProfil(){
    const [email, setEmail] = useState('cegenredemail.com');
    const [password, setPassword] = useState('en attente');
    return(
        <div className={styles.container}>
            <h1>Mon profil</h1>
            <section className={styles.myProfil}>
                <img className={styles.avatar} width="100px" height="100px" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Wayfarers&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Disbelief&skinColor=Pale" alt="Photo de profil"  />
                <h2>Nom Prenom</h2>
            </section>
            <h2>Mes informations</h2>
            <form className={styles.form}>
                <label htmlFor="email">Email :</label>
                <input id='email' type="email" value={email}/>
                <label htmlFor="password">Mot de passe :</label>
                <input type="password" value={password} />
                <button type='submit'>Edit</button>
            </form>
            <p>Classe : IW1</p>
            <form className={styles.form} action="">
                <div>
                    <input type="checkbox" name="css" id="css" />
                    <label htmlFor="css" style={{marginLeft: '10px'}}>Css</label>
                </div>
                <div>
                    <input type="checkbox" name="React" id="React" />
                    <label htmlFor="React" style={{marginLeft: '10px'}}>React</label>
                </div>
                <div>
                    <input type="checkbox" name="Breakdance.js" id="Breakdance.js" />
                    <label htmlFor="Breakdance.js" style={{marginLeft: '10px'}}>Breakdance.js</label>
                </div>
                <div>
                    <input type="checkbox" name="Html" id="Html" />
                    <label htmlFor="Html" style={{marginLeft: '10px'}}>Html</label>
                </div>
            </form>
        </div>
    )
}