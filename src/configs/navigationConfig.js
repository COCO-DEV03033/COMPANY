import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/"
  },
  {
    id: "projects",
    title: "Projects",
    type: "item",
    icon: <Icon.Box size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/projects"
  },
  {
    id: "earning",
    title: "Earning",
    type: "item",
    icon: <Icon.DollarSign size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/earning"
  },
  {
    id: "engineer",
    title: "Engineer",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/engineer"
  },
  {
    id: "technology",
    title: "Technology",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/technology"
  },
  {
    id: "skills",
    title: "Skills",
    type: "item",
    icon: <Icon.Pocket size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/skills"
  },
  {
    id: "overview",
    title: "Overview",
    type: "item",
    icon: <Icon.Codepen size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/overview"
  },
  {
    id: "test",
    title: "Test",
    type: "item",
    icon: <Icon.Codepen size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/test"
  }  
]

export default navigationConfig
