import UserCard from "./UserCard";

export default function UserList({ users, onDelete }) {
  if (users.length === 0) {
    return <p>No users</p>;
  }

  return (
    <ul className="list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      ))}
    </ul>
  );
}
