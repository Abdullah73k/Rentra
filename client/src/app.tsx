import "./app.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
