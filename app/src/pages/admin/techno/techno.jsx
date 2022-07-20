import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../contexts/app-context";
import technoServices from "../../../services/techno.services"; 
export default function Techno() {
    const [technos, setTechnos] = useState([]);
    const  {appState} = useAppContext();

    useEffect(() => {
        technoServices.getAll()
          .then((res) => setTechnos(res))
          .catch(console.error);
    }, []) 
  return (
    <div>
        {JSON.stringify(technos)}
    </div>
  );
}
