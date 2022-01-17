import styles from "./users.module.css";

export default function UsersSelect({ users, selectedUser, setSelectedUser }) {
  return (
    <div className={styles.formContainer}>
      <select className={styles.selectForm} value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option>Select User</option>
        {
        Array.isArray(users) &&
        users?.map((u, i) => (
          <option key={i} value={u}>{u}</option>
        ))}
      </select>
    </div>
  );
}
