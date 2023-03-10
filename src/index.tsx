import "@/index.css";
import { store } from "@/redux/gmap/store";
import reportWebVitals from "@/reportWebVitals";
import Search from "@/screen/Search";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

const container = document.getElementById("root")!;
const root = createRoot(container);

// Had to remove React.StrictMode to get google-map-react to work
root.render(
  <Provider store={store}>
    <Search />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
