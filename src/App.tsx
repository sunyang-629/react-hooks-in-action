import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { UserProvider } from "./components/user";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
