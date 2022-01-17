import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import styles from "./App.module.css";
import { Form, MapWrapper, SideMenu, UsersSelect } from "./components";

const mocData = [
  {
    userName: "Ahmed",
    buildings: [
      {
        buildingName: "Building 1",
        id: "AFG",
        name: "Afghanistan",
        position: [34.79120620588236, 67.78638470588234],
      },
      {
        buildingName: "Building 2",
        id: "ARG",
        name: "Argentina",
        position: [-38.53319952100841, -65.31919331932774],
      },
      {
        buildingName: "Building 3",
        id: "AUS",
        name: "Australia",
        position: [-24.989423953974864, 134.17243882008364],
      },
    ],
  },
  {
    userName: "Abdelrahman",
    buildings: [
      {
        buildingName: "Home",
        id: "BFA",
        name: "Burkina Faso",
        position: [12.157241447368424, -1.8246464210526312],
      },
      {
        buildingName: "Office",
        id: "BIH",
        name: "Bosnia and Herzegovina",
        position: [44.22598542857143, 17.839320095238094],
      },
      {
        buildingName: "Mall",
        id: "BLZ",
        name: "Belize",
        position: [17.396577526315788, -88.60339900000001],
      },
    ],
  },
]

const mocUsers = [ "Ahmed", "Abdelrahman"]

function App() {
  const [view, setView] = useState(true);
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [buildings, setBuildings] = useState([]);
  const [usersBuildings, setUsersBuildings] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState()

  const saveDataLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }


  useEffect(() => {
    const savedBuildings = localStorage.getItem("buildings")
    const savedUsers = localStorage.getItem("users")
    if(savedBuildings){
      setBuildings([...JSON.parse(savedBuildings)])
    }else{
      setBuildings([...mocData])
      saveDataLocal('buildings', mocData)
    }

    if(savedUsers){
      setUsers([...JSON.parse(savedUsers)])
    }else{
      setUsers([...mocUsers])
      saveDataLocal('users', mocUsers)
    }
  }, [])

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setUsersBuildings(buildings.find(u => u.userName === user).buildings)
  }


  const addBuilding = (building) => {
    if(building){
      const unModifiedBuildings =buildings.filter(b => b.userName !== selectedUser)
      const modifiedBuilding =buildings.find(b => b.userName === selectedUser)
      const newBuildingsArray =[...unModifiedBuildings,
        {
          userName: modifiedBuilding.userName,
          buildings: [...modifiedBuilding.buildings, building]
        }
      ]
      setBuildings(newBuildingsArray)
      setUsersBuildings([...usersBuildings, building])
      saveDataLocal('buildings', newBuildingsArray)
    }
    setView(true);
  };

  const handleCancel = () => {
    setView(true);
  };

  return (
    <div className={styles.App}>
      <div className={styles.sideMenu}>
        <SideMenu handleAddBuilding={() => setView(false)} usersBuildings={usersBuildings} setSelectedBuilding={setSelectedBuilding} />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <UsersSelect users={users} selectedUser={selectedUser} setSelectedUser={handleUserSelect}/>
        </div>
        {view ? <MapWrapper building={selectedBuilding} /> : <Form addBuilding={addBuilding} handleView={handleCancel} />}
      </div>
    </div>
  );
}

export default App;
