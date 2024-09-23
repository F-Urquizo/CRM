import type { ReactNode } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import "./styles/global.css";
import { Layout as RALayout } from "react-admin";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="main">
    <Navbar />
    <div className="layout">
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="contentContainer">
        {children}
      </div>
    </div>
    <div className="footerContainer">
      <Footer />
    </div>
  </div>
);
