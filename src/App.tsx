import { ReactNode, useState } from "react";

interface IFriends {
  id: number;
  name: string;
  image: string;
  balance: number;
}

interface IButton {
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
  children?: ReactNode;
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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {isOpen ? (
          <>
            {" "}
            <FormAddFriend />{" "}
            <Button isOpen={isOpen} setIsOpen={setIsOpen}>
              Close
            </Button>
          </>
        ) : (
          <Button isOpen={isOpen} setIsOpen={setIsOpen}>
            Add friend
          </Button>
        )}
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  return (
    <ul>
      {initialFriends.map((friend) => {
        return <Friend friend={friend} key={friend.id} />;
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
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>select</Button>
    </li>
  );
}

function Button({ children, isOpen, setIsOpen }: IButton) {
  function handleClick() {
    return setIsOpen(!isOpen);
  }

  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👬 Friend name</label>
      <input type="text" />
      <label>🌄 Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💰 Bill Value</label>
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
