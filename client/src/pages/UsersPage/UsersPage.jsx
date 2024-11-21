import Toolbar from "../../components/Toolbar/Toolbar";
import Table from "../../components/Table/Table";
import axiosInstance from "../../axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { VITE_API, VITE_BASE_URL } = import.meta.env;
import styles from "./UsersPage.module.css";

function UsersPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance(`${VITE_BASE_URL}${VITE_API}/users`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        setNotice(error?.response?.data?.message);
        setShowNotice(true);
      }
    };

    getUsers();
  }, []);

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(new Set(allUserIds));
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const blockUser = async (users) => {
    if (users.size === 0) {
      return;
    }
    try {
      const usersId = [...users];
      const blockPromises = usersId.map((id) =>
        axiosInstance.patch(`${VITE_BASE_URL}${VITE_API}/users/block/${id}`)
      );
      const [res] = await Promise.all(blockPromises);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          usersId.includes(user.id) ? { ...user, status: "block" } : user
        )
      );
      setSelectedUsers(new Set());
      setNotice(res.data.message);
      setShowNotice(true);
    } catch (error) {
      setNotice(error?.response?.data?.message);
      setShowNotice(true);
      console.log(error);
    }
  };

  const unBlockUser = async (users) => {
    if (users.size === 0) {
      return;
    }
    try {
      const usersId = [...users];
      const unblockPromises = usersId.map((id) =>
        axiosInstance.patch(`${VITE_BASE_URL}${VITE_API}/users/unblock/${id}`)
      );
      const [res] = await Promise.all(unblockPromises);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          usersId.includes(user.id) ? { ...user, status: "active" } : user
        )
      );
      setSelectedUsers(new Set());
      setNotice(res.data.message);
      setShowNotice(true);
    } catch (error) {
      setNotice(error?.response?.data?.message);
      setShowNotice(true);
      console.log(error);
    }
  };

  const deleteUser = async (users) => {
    if (users.size === 0) {
      return;
    }
    try {
      const usersId = [...users];
      const deletePromises = usersId.map((id) =>
        axiosInstance.delete(`${VITE_BASE_URL}${VITE_API}/users/${id}`)
      );
      const [res] = await Promise.all(deletePromises);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !usersId.includes(user.id))
      );
      setSelectedUsers(new Set());
      setNotice(res.data.message);
      setShowNotice(true);
    } catch (error) {
      setNotice(error?.response?.data?.message);
      setShowNotice(true);
      console.log(error);
    }
  };

  const closeError = () => {
    setShowNotice(false);
  };

  useEffect(() => {
    if (showNotice) {
      const timer = setTimeout(() => {
        setShowNotice(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showNotice]);

  const changeHandler = (e) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users.filter(
    (el) =>
      el.first_name.toLowerCase().includes(filter.toLowerCase()) ||
      el.last_name.toLowerCase().includes(filter.toLowerCase()) ||
      el.email.toLowerCase().includes(filter.toLowerCase())
  );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Toolbar
        showNotice={showNotice}
        notice={notice}
        closeError={closeError}
        blockUser={blockUser}
        unBlockUser={unBlockUser}
        deleteUser={deleteUser}
        selectedUsers={selectedUsers}
        changeHandler={changeHandler}
      />
      <Table
        users={filteredUsers}
        selectedUsers={selectedUsers}
        handleSelectAll={handleSelectAll}
        handleSelectUser={handleSelectUser}
      />
      <button
        onClick={logout}
        className={`${styles.btn_logOut} btn btn-secondary`}
      >
        Log out
      </button>
    </>
  );
}

export default UsersPage;
