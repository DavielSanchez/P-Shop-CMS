import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

export default function SidebarItem({ text, icon, open }) {
  return (
    <ListItem button className="hover:bg-gray-800">
      <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
      {open && <ListItemText primary={text} />}
    </ListItem>
  );
}