import type { ReactNode } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import "./styles/global.css";
import { usePermissions } from "react-admin";
import LandingPage from "./components/landing/LandingPage";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { permissions } = usePermissions();

  if (permissions === "Donador") {
    // Renderiza solo la LandingPage cuando el permiso sea Donador
    return <LandingPage />;
  }

  return (
    <div className="main">
      <Navbar />
      <div className="layout">
        {permissions === "Admin" && (
          <div className="menuContainer">
            <Menu />
          </div>
        )}
        <div className="contentContainer">{children}</div>
      </div>
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};
