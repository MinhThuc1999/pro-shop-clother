import React, { useEffect } from "react";
import { Space, Table, Button } from "antd";

import "./userManager.scss";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  getUsers,
  updateUser,
  addUsers,
} from "../../../../redux/admin/apiCall";
import {
  publicRequest,
  userRequest,
} from "../../../../redux/slice/requestMethods";
import ModelUser from "../../components/ModelUser";
import ModelEditUser from "../../components/ModelEditUser";
function UserManager() {
  const [users, setUsers] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModelAdd, setIsModelAdd] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [idCurrent, setIdCurrent] = React.useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest.get("api/user");
      try {
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  const createUser = async (data) => {
    try {
      addUsers(data, dispatch);
      setIsModalOpen(!isModalOpen);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    let confirm = window.confirm("bạn chắc chắn muốn xóa");

    if (confirm) {
      try {
        await deleteUser(id, dispatch);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = (data) => {
    //updateUser(id, ad, dispatch);
    setIdCurrent(data._id);
    setIsModalOpen(!isModalOpen);
    setCurrentUser(data);
  };
  const editUser = async (data) => {
    await updateUser(idCurrent, data, dispatch);
  };

  const handleHideModelUser = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handHideModelAdd = () => {
    setIsModelAdd(!isModelAdd);
  };
  return (
    <div className="user-container">
      <h1 style={{ textAlign: "center" }}>ALL USER</h1>
      <Button
        style={{ marginBottom: "20px" }}
        type="primary"
        onClick={() => {
          setIsModelAdd(!isModelAdd);
        }}
      >
        NEW USER
      </Button>

      <ModelUser
        modelAdd={isModelAdd}
        toggle={handHideModelAdd}
        createUser={createUser}
      />

      {isModalOpen && (
        <ModelEditUser
          toggleHandleModel={handleHideModelUser}
          currentUser={currentUser}
          editUser={editUser}
        />
      )}
      <table id="customers">
        <thead>
          <tr>
            <th>STT</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>IsAdmin</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.isAdmin ? "Admin" : "User"}</td>
                <td>
                  <span style={{ paddingRight: "20px" }}>
                    <Button
                      type="primary"
                      onClick={() => {
                        handleUpdate(item);
                      }}
                    >
                      Edit
                    </Button>
                  </span>
                  <span>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserManager;
