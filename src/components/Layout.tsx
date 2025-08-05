// components/Layout.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "200px",
          background: "#2c3e50",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Protos Farm</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                style={{ color: "white", textDecoration: "none" }}
              >
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            background: "#34495e",
            color: "white",
            padding: "10px 20px",
          }}
        >
          <h3>Dashboard</h3>
        </header>

        {/* Page content */}
        <main style={{ padding: "20px", background: "#ecf0f1", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
};
