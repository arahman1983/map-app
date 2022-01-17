import styles from './sideMenu.module.css'

export default function SideMenu({handleAddBuilding, usersBuildings}) {
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        Buildings
      </div>
      <div className={styles.list}>
        {
          usersBuildings?.length > 0 ?
          <ul>
            {
              usersBuildings.map((uB,i) => (
                <li key={i}>{uB.buildingName}</li>
              ))
            }
          </ul>

          : <span className={styles.NoData}>No Building</span>
        }
      </div>
      <button className={styles.addButton} onClick={handleAddBuilding}>
        Add Building
      </button>
    </div>
  )
}