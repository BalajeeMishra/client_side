import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { spinnerContext } from "../context/spinnerContext";

function AdminUserForGame() {
  const { setLoading } = useContext(spinnerContext);
  const [phoneInput, setContact] = useState();
  const [roles, setRoles] = useState();
  const [selectedData, setSelectData] = useState();
  useEffect(() => {
    fn();
  }, []);
  const fn = async () => {
    const rolesName = await axios.get("/api/user/roles");
    if (rolesName.status == 200) {
      setRoles(rolesName.data);
    }
  };
  const addAdminforPlaying = async (e) => {
    setLoading(true);
    e.preventDefault();
    const adduser = await axios.post("/api/user/adminplayerregister", {
      phoneInput,
      selectedData,
    });
    if (adduser.status == 200) {
      setLoading(false);
      alert("user created successfully");
    }
  };
  return (
    <div className="text-center mt-5">
      <h5>Add the user who will controll the game as admin</h5>
      <form onSubmit={addAdminforPlaying}>
        <div>
          <label>Enter the phone no of User</label>
          <input
            type="number"
            placeholder="Enter the phone no of User"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label>Give the role:</label>
          <select name="role" onChange={(e) => setSelectData(e.target.value)}>
            {roles
              ? roles.map((e) => (
                  <>
                    <option value={e.name}>{e.name}</option>;
                  </>
                ))
              : ""}
          </select>
        </div>
        <div>
          <button type="submit" className="mt-5">
            Add user
          </button>
        </div>
      </form>
    </div>
  );
}
export default AdminUserForGame;
