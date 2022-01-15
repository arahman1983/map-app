import { useState } from 'react';
import styles from './App.module.css';
import { Form, MapWrapper, SideMenu, UsersSelect } from './components';

function App() {
  const [view, setView] = useState(true)

  const addBuilding = (building) => {
    console.log(building);
    setView(true);
  }; 
  const handleCancel = () => {
    setView(true)
  }

  return (
    <div className={styles.App}>
      <div className={styles.sideMenu}>
        <SideMenu handleAddBuilding={()=>setView(false)}/>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <UsersSelect />
        </div>
        {
          view 
          ? <MapWrapper />
          : <Form addBuilding={addBuilding} handleView={handleCancel}/>
        }
      </div>
    </div>
  );
}

export default App;
