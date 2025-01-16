import { Home, Settings, Calendar, Users, Activity, Menu } from 'lucide-react'
import { cn } from '../lib/utils'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', count: 0 },
    { icon: Calendar, label: 'Calendar', count: 2 },
    { icon: Users, label: 'Patients', count: 1 },
    { icon: Settings, label: 'Settings', count: 0 },
    { icon: Activity, label: 'Reports', count: 0 },
  ]

  return (
    <div className={cn("w-[250px] border-r bg-gray-50/50 pb-12", className)}>
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6" />
          <span className="font-semibold">Cosmediate</span>
        </div>
      </div>
      <div className="space-y-4 py-4">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={cn(
              "px-3 py-2 mx-3 flex items-center gap-3 rounded-md text-sm",
              item.label === "Settings" ? "bg-gray-100" : "hover:bg-gray-100"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.count > 0 && (
              <span className="ml-auto bg-red-100 text-red-600 rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

