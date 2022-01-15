import styles from './users.module.css'

export default function UsersSelect() {
  return(
    <div className={styles.formContainer}>
      <select className={styles.selectForm}>
        <option>User 1</option>
        <option>User 2</option>
        <option>User 3</option>
      </select>
    </div>
  )
}