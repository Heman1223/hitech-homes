import { useState, useContext, useEffect } from "react";
import {
  Building2,
  TrendingUp,
  Plus,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const { logout } = useContext(AuthContext);

  // ✅ Collapsed state with persistence
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  const menuItems = [
    { name: "Dashboard", page: "admin-dashboard", icon: TrendingUp },
    { name: "Add Property", page: "add-property", icon: Plus },
    { name: "View Site", page: "home", icon: Home },
  ];

  // ✅ Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <div
      style={{
        width: isCollapsed ? "90px" : "280px",
        background: "white",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
        transition: "width 0.3s ease",
        overflow: "hidden",
        animation: "slideInLeft 0.6s ease-out",
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: isCollapsed ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          <Building2
            style={{
              width: "2.5rem",
              height: "2.5rem",
              color: "#2563eb",
              flexShrink: 0,
              animation: "pulse 3s ease-in-out infinite",
            }}
          />
          {!isCollapsed && (
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #2563eb 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Panel
            </span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#4b5563",
            marginLeft: "auto",
          }}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <Menu size={22} /> : <X size={22} />}
        </button>
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav
        style={{
          flex: 1,
          padding: "1rem 0",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: isCollapsed ? "center" : "flex-start",
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;

          return (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              title={isCollapsed ? item.name : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isCollapsed ? "0" : "1rem",
                justifyContent: isCollapsed ? "center" : "flex-start",
                padding: isCollapsed ? "0.875rem" : "0.875rem 1.5rem",
                color: isActive ? "#2563eb" : "#4b5563",
                fontWeight: 600,
                background: isActive ? "#eff6ff" : "transparent",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderLeft: isActive
                  ? "3px solid #2563eb"
                  : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.color = "#2563eb";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#4b5563";
                }
              }}
            >
              <Icon
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  flexShrink: 0,
                }}
              />
              {!isCollapsed && item.name}
            </button>
          );
        })}
      </nav>

      {/* ===== FOOTER ===== */}
      <div
        style={{
          padding: isCollapsed ? "1rem 0" : "1.5rem",
          borderTop: "1px solid #e5e7eb",
          textAlign: isCollapsed ? "center" : "left",
        }}
      >
        <button
          onClick={logout}
          title="Logout"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: isCollapsed ? "0" : "1rem",
            padding: isCollapsed ? "0.75rem" : "0.875rem 1.5rem",
            color: "#dc2626",
            fontWeight: 600,
            background: "transparent",
            border: "none",
            width: "100%",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fef2f2";
            e.currentTarget.style.color = "#991b1b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#dc2626";
          }}
        >
          <LogOut
            style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }}
          />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
