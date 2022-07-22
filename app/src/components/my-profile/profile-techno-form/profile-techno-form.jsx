import React, { useEffect, useState } from "react";
import TechnoService from "../../../services/techno.service";
import styles from './profile-techno-form.module.scss';
import { toast } from 'react-toastify';

export default function ProfileTechnoForm({userTechnos}) {
    const [techno, setTechno] = useState([]);
    const [selectedTechno, setSelectedTechno] = useState([]);

    useEffect(() => {
        TechnoService.getAll()
            .then(res => {
                setTechno(res);
            })
            .catch(console.error);
        let selectedTechnoTemp = userTechnos.map(techno => techno.id.toString() );
        setSelectedTechno(selectedTechnoTemp);
    }, []);

    const handleSelect = (e) => {
        if(e.target.value ==='none'){
            setSelectedTechno([]);
            return;
        }
        if(selectedTechno.includes(e.target.value)){
            setSelectedTechno(selectedTechno.filter(item => item !== e.target.value));
        }else{
            setSelectedTechno(
                [...selectedTechno, e.target.value]
            );
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let res = TechnoService.modifySelfTechno(selectedTechno);
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
            <select name="techno" multiple={true} onChange={handleSelect} value={selectedTechno}>
                <option value='none'>---</option>
                {techno.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
            </select>
            <p>Selection : </p>
            <p>
                {selectedTechno&&selectedTechno.map(tech => (
                    (techno.find(t => t.id === parseInt(tech))?.name ?? null) + ' / '
                ))}
            </p>
            <button onClick={handleSubmit} className="btn green">Edit</button>
        </div>

    ) 
}