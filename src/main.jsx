import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import Header from "./UI/Header/Header.jsx";
import Wave from "./components/Wave/Wave.jsx";
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <CustomCursor />
        <Header />
        <div className="wave">
            <Wave />
        </div>
        <App />
    </>
);
