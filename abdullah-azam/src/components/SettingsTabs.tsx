import { cn } from '../lib/utils'

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = ['General', 'Password', 'Price', 'Treatments']

  return (
    <div className="border-b">
      <nav className="flex gap-4 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "py-4 text-sm font-medium relative",
              activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

