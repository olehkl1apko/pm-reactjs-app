import { useCollection } from "../../hooks/useCollection";

import "./OnlineUsers.css";
import { Avatar } from "../";

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection("users");

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online ? (
              <span className="user-status online-user"></span>
            ) : (
              <span className="user-status offline-user"></span>
            )}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
