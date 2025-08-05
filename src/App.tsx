// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { PrivateRoute } from "./components/PrivateRoute";
import { UsersPage } from "./pages/UsersPage";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
            {/* One PrivateRoute wrapping all protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
