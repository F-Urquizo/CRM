import type { ReactNode } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import "./styles/global.css";
import { Layout as RALayout } from "react-admin";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="layout">
    <Navbar />
    <div className="main">
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">{children}</div>
      </div>
      <Footer />
    </div>
  </div>
);
