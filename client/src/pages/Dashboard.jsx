import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  fetchUsers();
}, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addUser = async () => {
    if (!name || !email) {
  alert("Name and Email are required");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  alert("Enter a valid email");
  return;
}

if (!editId && password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}
  try {
    if (editId) {
  await axios.put(`http://localhost:5000/api/users/${editId}`, {
    name,
    email,
    role,
  });

  setEditId(null);
} else {
  await axios.post("http://localhost:5000/api/users", {
    name,
    email,
    password,
    role,
  });
}

    setName("");
    setEmail("");
    setPassword("");
    setRole("User");

    fetchUsers();

  } catch (err) {
    alert("Error adding user");
  }
  };
const deleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  } catch (err) {
    alert("Error deleting user");
  }
};

const editUser = (user) => {
  setEditId(user._id);
  setName(user.name);
  setEmail(user.email);
  setRole(user.role);
};
  return (
    <>
<nav className="navbar navbar-dark bg-dark px-4">
  <span className="navbar-brand mb-0 h1">
    Mini Admin Dashboard
  </span>

  <button
    className="btn btn-outline-light"
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/");
    }}
  >
    Logout
  </button>
</nav>

<div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

<div className="row mb-4">

  <div className="col-md-6 mb-3">
    <div className="card bg-primary text-white shadow">
      <div className="card-body">
        <h5>Total Users</h5>
        <h2>{users.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-6 mb-3">
    <div className="card bg-success text-white shadow">
      <div className="card-body">
        <h5>Total Admins</h5>
        <h2>
          {users.filter(user => user.role === "Admin").length}
        </h2>
      </div>
    </div>
  </div>

</div>

<div className="card shadow p-4 mb-4 rounded-4">
  <div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
  <h4>Add User</h4>

  <input
    className="form-control mb-2"
    placeholder="Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
  />

  <input
    className="form-control mb-2"
    placeholder="Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
  />

  {!editId && (
  <input
    type="password"
    className="form-control mb-2"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
)}

  <select
    className="form-select mb-3"
    value={role}
    onChange={(e)=>setRole(e.target.value)}
  >
      <option>User</option>
      <option>Admin</option>
  </select>

  <button
      className="btn btn-success w-100"
      onClick={addUser}
  >
      {editId ? "Update User" : "Add User"}
  </button>

</div>
      <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.filter((user) => {
            return (
              user.name.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
            );
          }).map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
  <button
    className="btn btn-primary btn-sm me-2"
    onClick={() => editUser(user)}
  >
     ✏️ Edit
  </button>

  <button
    className="btn btn-outline-danger btn-sm"
    onClick={() => deleteUser(user._id)}
  >
    🗑️ Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
</>
);
}

export default Dashboard;