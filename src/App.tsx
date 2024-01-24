import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { UserProvider } from "./components/user";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import PageSpinner from "./components/page-spinner";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Suspense fallback={<PageSpinner />}>
            <RouterProvider router={router} />
          </Suspense>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
