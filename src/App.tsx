import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { UserProvider } from "./components/user";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
