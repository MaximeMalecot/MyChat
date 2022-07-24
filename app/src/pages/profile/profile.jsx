import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import MyProfileForm from '../../components/my-profile/my-profile-form/my-profile-form';
import ProfileTechnoForm from '../../components/my-profile/profile-techno-form/profile-techno-form';
import ProfileFieldForm from '../../components/my-profile/profile-field-form/profile-field-form';
import UserService from "../../services/user.service";

export default function Profile(){
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if(!showForm){
            UserService.getSelf().then(res => {
                setUser({...res, password: ''});
            })
            .catch(console.error);
        }
    }, [showForm]);

    const handleFormDisplay = () => {
        setShowForm(!showForm);
    }

    return(
        <div className={styles.container}>
            {showForm ?
                <div className={styles.cardForm}>
                    <button className={`${styles.close} btn red`} onClick={() => setShowForm(!showForm)}>x</button> 
                    <MyProfileForm userData={user}/>
                    <ProfileTechnoForm userTechnos={user.technos} />
                    <ProfileFieldForm userField ={user.fieldId} />
                </div>
                :
                <div className={styles.content}>
                <div className={styles.card}>
                    <div onClick={()=>setShowForm(true)} className={`${styles.edit} btn green`}>Edit</div>
                    <div className={styles.firstinfo}>
                        <img width='120px' height="120px" src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Wayfarers&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Disbelief&skinColor=Pale" alt="Photo de profil"  />
                        <div className={styles.profileinfo}>
                            <p className={styles.name}>{user.firstName} {user.lastName}</p>
                            <p className={styles.email}>{user.email}</p>
                            <p className={styles.bio}>Je suis en classe de techo IW1</p>
                        </div>
                    </div>

                </div>
                <div className={styles.badgescard}>
                    {user.technos?.length ? 
                        user.technos.map(techno => (
                            <img src={`https://icongr.am/devicon/${techno.name}-original.svg?size=41`} alt={`logo ${techno.name}`} />
                        ))
                    : <p>Ah t'aime pas le dev... Ok c'est pas grave, ça arrive de faire des erreurs.</p>
                    }
                </div>
            </div>    
            }
        </div>
    )
}