import { useState } from "react";
import UserForm from "./components/userForm";
import UserList from "./components/userList";

function App() {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => setRefresh(!refresh);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>User Manager</h1>

            <div style={styles.card}>
                <UserForm fetchUsers={triggerRefresh} />
            </div>

            <div style={styles.card}>
                <UserList refresh={refresh} />
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "Arial",
        textAlign: "center"
    },
    title: {
        marginBottom: "20px",
        color: "#333"
    },
    card: {
        background: "#f9f9f9",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }
};

export default App;