import { SquareTerminal } from "lucide-react";

// This is sample data.
export const data = {
  menu: [
    {
      title: "Pessoas",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      submenu: [
        {
          title: "Usuários",
          url: "/users",
        },
      ],
    },
  ],
};
