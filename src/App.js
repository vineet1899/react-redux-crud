import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Roles from "./pages/Roles";
import AddRole from "./pages/AddRole";
import EditRole from "./pages/EditRole";
function App() {
  return (
    <>
      <div className="container">
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/:id" element={<Home />} />
          <Route exact path="/addUser" element={<AddUser />} />
          <Route exact path="/addRole" element={<AddRole />} />
          <Route exact path="/editUser/:id" element={<EditUser />} />
          <Route exact path="/editRole/:id" element={<EditRole />} />
          <Route exact path="/roles/:id" element={<Roles />} />
          <Route exact path="/roles" element={<Roles />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
