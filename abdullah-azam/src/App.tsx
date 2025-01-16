import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { TreatmentManager } from './components/TreatmentManager'
import { SettingsTabs } from './components/SettingsTabs'

export default function App() {
  const [activeTab, setActiveTab] = useState('Treatments')

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <header className="flex items-center justify-between px-6 py-3 border-b">
          <h1 className="text-xl font-semibold">Settings</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-100" />
            <span className="text-sm text-gray-600">Admin</span>
          </div>
        </header>
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'Treatments' && <TreatmentManager />}
      </div>
    </div>
  )
}

