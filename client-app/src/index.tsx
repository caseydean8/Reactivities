import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.css";
import { StoreContext, store } from "./app/stores/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    {/* React strict mode will render components twice in development */}
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </StoreContext.Provider>
);
