import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { spinnerContext } from "../context/spinnerContext";

function AllAdminPlayer() {
  const { setLoading } = useContext(spinnerContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fn();
  }, []);

  const fn = async () => {
    setLoading(true);
    const players = await axios.get("/api/user/alladminplayer");
    setData(players.data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    setLoading(true);
    const deletedUser = await axios.get(`/api/user/delete/${id}`);
    // add here the flash message.
    // / delete karne ke bad ham same page pe aate hai o deleted dekhne ke liye humko refresh karn a hota hai.
    setLoading(false);
    if (deletedUser.status == 200) {
      fn();
    }
  };

  return (
    <div className="text-center mt-5">
      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Mobile Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((e, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{e.phoneNo}</td>
                  <td>Admin player</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteUser(e._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
    </div>
  );
}

export default AllAdminPlayer;
