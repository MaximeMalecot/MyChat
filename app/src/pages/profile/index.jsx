import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export default function Profile(){
    const [email, setEmail] = useState('cegenredemail.com');
    const [name, setName] = useState('Jean Boris');
    const [password, setPassword] = useState('en attente');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, name, password);
    }
    return(
        <div className={styles.container}>
            {showForm ?
                <form className={styles.cardForm}>
                    <p className={styles.close} onClick={()=>setShowForm(false)}>x</p>
                    <label htmlFor="email">Email :</label>
                    <input id='email' type="email" value={email}/>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" value={password} />
                    <p>Classes : IW</p>
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
                    <button type='submit' onSubmit={handleSubmit}>Edit</button>
                </form>
                :
                <div className={styles.content}>
                <div className={styles.card}>
                    <p className={styles.edit} onClick={()=>setShowForm(true)}>edit</p>
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
            }
        </div>
    )
}