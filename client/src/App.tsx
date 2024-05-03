import { FC, useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { User } from "./models/User";
import { UserService } from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={() => getUsers()}>Get Users List</button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `User ${store.user.email} is authorized`
          : "NEED AUTHORIZE"}
      </h1>
      <h2>
        {store.user.isActivated
          ? "User is activated"
          : "NEED ACTIVATE ACCOUNT BY MAIL"}
      </h2>
      <button onClick={() => store.logout()}>Quit</button>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
