import { ReactNode, useState } from "react";

interface IFriends {
  // id number or generated Id which is string
  id: number | string;
  name: string;
  image: string;
  balance: number;
}

interface IButton {
  children: ReactNode;
  onClick?: () => void;
}

const initialFriends: IFriends[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// Button
function Button({ children, onClick }: IButton) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleClick() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend: IFriends) {
    setFriends((friends) => [...friends, friend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleClick}>{showAddFriend ? "Close" : "Add friend"}</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList({ friends }: { friends: IFriends[] }) {
  return (
    <ul>
      {friends.map((friend: IFriends) => {
        return <Friend friend={friend} key={friend.name} />;
      })}
    </ul>
  );
}

function Friend({ friend }: { friend: IFriends }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} ${friend.balance}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }: { onAddFriend: (friend: IFriends) => void }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // check if there is no values then display nothing
    if (name === "" || image === "") return;

    // Add new friend object
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>🌄 Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH X</h2>
      <label>💰 Bill value</label>
      <input type="text" />
      <label>🧍‍♂️ Your expense</label>
      <input type="text" />
      <label>👬 X expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="">You</option>
        <option value="">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default App;
