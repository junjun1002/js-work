import { APP_NAME } from "../shared/constants";
import { isNonEmptyString } from "../shared/utils/validators";
import Input from "../shared/components/Input";
import Button from "../shared/components/Button";
import UserList from "../features/users/components/UserList";
import { useUsers } from "../features/users/hooks/useUsers";

export default function App() {
  const {
    users,
    nameInput,
    setNameInput,
    addUser,
    removeUser,
  } = useUsers();

  const canAdd = isNonEmptyString(nameInput);

  return (
    <main className="page">
      <h1>{APP_NAME}</h1>

      <section className="panel">
        <h2>Users</h2>
        <div className="row">
          <Input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="New user name"
          />
          <Button onClick={addUser} disabled={!canAdd}>Add</Button>
        </div>
        <UserList users={users} onDelete={removeUser} />
      </section>
    </main>
  );
}
