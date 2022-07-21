import React, { useEffect, useState } from "react";
import TechnoService from "../../../services/techno.service";

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
        console.log(selectedTechno);
    }

    return (
        <div>
            <select name="techno" multiple={true} onChange={handleSelect} value={selectedTechno}>
                <option value='none'>---</option>
                {techno.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
            </select>
            <button onClick={handleSubmit} className="btn green">Edit</button>
        </div>

    ) 
}