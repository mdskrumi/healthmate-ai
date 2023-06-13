import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardOutlet from "./components/DashboardOutlet";
import NewSession from "./components/NewSession";
import SessionHistory from "./components/SessionHistory";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<DashboardOutlet />}>
            <Route path={"/"} element={<Navigate to={"session"} />} />
            <Route path={"session"} element={<NewSession />} />
            <Route path={"history"} element={<SessionHistory />} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} replace={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
