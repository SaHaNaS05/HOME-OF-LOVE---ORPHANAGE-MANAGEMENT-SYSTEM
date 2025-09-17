import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../src/logo.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { SidebarData } from "./Data";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div className="Sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>
          Home<br />
          <span>of<br /></span>love
        </span>
      </div>

      <motion.div className="menu">
        {SidebarData.map((item, index) => (
         <Link to={item.path} key={index} style={{ textDecoration: 'none' }}> {/* Wrap each menuItem with Link */}
            <motion.div
              className={selected === index ? "menuItem active" : "menuItem"}
              onClick={() => setSelected(index)}
              whileHover={{ scale: 1.1 }}
              style={{ cursor: 'pointer' }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </motion.div>
      </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
