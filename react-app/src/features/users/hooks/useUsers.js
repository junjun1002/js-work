import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../services/usersApi";
import { isNonEmptyString } from "../../../shared/utils/validators";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const nextId = useMemo(() => {
    if (users.length === 0) return 1;
    return Math.max(...users.map((u) => u.id)) + 1;
  }, [users]);

  const addUser = () => {
    const name = nameInput.trim();
    if (!isNonEmptyString(name)) return;

    const newUser = { id: nextId, name, coin: 100 };
    setUsers((prev) => [...prev, newUser]);
    setNameInput("");
  };

  const removeUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    users,
    nameInput,
    setNameInput,
    addUser,
    removeUser,
  };
}
