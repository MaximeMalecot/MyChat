import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export default function Profile(){
    const [email, setEmail] = useState('cegenredemail.com');
    const [name, setName] = useState('Jean Boris');
    const [password, setPassword] = useState('en attente');
    return(
        <div className={styles.container}>
            {/* <h1>Mon profil</h1>
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
            </form> */}
            <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.firstinfo}>
                        <img width='120px' height="120px" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Wayfarers&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Disbelief&skinColor=Pale" alt="Photo de profil"  />
                        <div className={styles.profileinfo}>
                            <h1>{name}</h1>
                            <h3>{email}</h3>
                            <p className={styles.bio}>Je suis en classe de techo IW1</p>
                        </div>
                    </div>
                </div>
                <div className={styles.badgescard}>
                    <span className="devicon-docker-plain-wordmark colored"></span>
                    <span className="devicon-javascript-plain colored"></span>
                    <span className="devicon-mongodb-plain-wordmark colored"></span>
                    <span className="devicon-react-original-wordmark colored"></span>
                </div>
            </div>
        </div>
    )
}