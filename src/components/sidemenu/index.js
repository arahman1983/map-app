import styles from './sideMenu.module.css'

export default function SideMenu({handleAddBuilding}) {
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        Buildings
      </div>
      <div className={styles.list}>
        lisy
      </div>
      <button className={styles.addButton} onClick={handleAddBuilding}>
        Add Building
      </button>
    </div>
  )
}