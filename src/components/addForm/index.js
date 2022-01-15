import { useState } from "react";
import styles from "./form.module.css";
import countries from "../../assets/countriesList.json";

export default function Form({ addBuilding, handleView }) {
  const [buildingName, setBuildingName] = useState();
  const [location, setLocation] = useState();
  const [error, setError] = useState(false)

  const handleBuildingName = (e) => {
    setError(false)
    setBuildingName(e.target.value);
  };

  const handleCountries = (e) => {
    setError(false)
    setLocation(countries.find((c) => c.id === e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(buildingName && location){
      setError(false)
      addBuilding();
      return
    }
    setError(true)
  };

  const handleCancel = () => {
    handleView();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formInputs}>
          <div>
            <label>Building Name <sup>*</sup></label>
            <input value={buildingName} onChange={handleBuildingName} />
          </div>
          <div>
            <label>Location <sup>*</sup></label>
            <div className={styles.formContainer}>
              <select className={styles.selectForm} value={location?.id || ""} onChange={handleCountries}>
                <option value={""}>Select Country</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            {error && <span className={styles.error}>You should Add Building Name and Choose Country</span>}
          </div>
        </div>

        <div className={styles.formFooter}>
          <button type="button" onClick={handleCancel}>Cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
