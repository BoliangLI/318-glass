
import { NavLink } from "react-router-dom";
import { Home, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/designer", label: "设计器", icon: Palette },
];

export function Navigation() {
  return (
    <nav className="glass sticky top-0 z-50 mx-4 mt-4 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">AquaGlass</span>
        </div>
        
        <div className="flex items-center gap-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/80 text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/20"
                )
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
