import { StrictMode } from "react"; //main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { TokenProvider } from "./Context/TokenContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import InfinitePostsJsonPlaceholder from "./components/InfinitePostsJsonPlaceholder";
import InfinitePostsAutoJsonPlaceholder from "./components/InfiniteAuto";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <>
        <TokenProvider>
          <App />
        </TokenProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </>
    </QueryClientProvider>
  </StrictMode>
);
