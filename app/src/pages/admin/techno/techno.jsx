import React, { useState, useEffect } from "react";
import styles from './techno.module.scss';
import { useAppContext } from "../../../contexts/app-context";
import technoService from "../../../services/techno.service";
export default function Techno() {
  const [technos, setTechnos] = useState([]);
  const { appState } = useAppContext();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      const techno = await technoService.create(name);
      setTechnos([...technos, techno]);
  };
  useEffect(() => {
    technoService
      .getAll()
      .then((res) => setTechnos(res))
      .catch(console.error);
  }, []);
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
            type="text"
          />
          <button type="submit">Créer</button>
        </form>
      </div>
      {technos.map((techno,index) => {return <div key={index}> {techno.name} </div>})}
    </div>
  );
}
