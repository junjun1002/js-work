import { formatCoin } from "../../../shared/utils/format";
import Button from "../../../shared/components/Button";

export default function UserCard({ user, onDelete }) {
  return (
    <li className="card">
      <span>{user.name}</span>
      <span>{formatCoin(user.coin)}</span>
      <Button onClick={() => onDelete(user.id)}>Delete</Button>
    </li>
  );
}
