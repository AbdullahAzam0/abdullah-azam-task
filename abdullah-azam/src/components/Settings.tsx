import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'

interface Treatment {
  id: string
  name: string
  subCategories: SubCategory[]
}

interface SubCategory {
  id: string
  name: string
}

const initialTreatments: Treatment[] = [
  {
    id: '1',
    name: 'Skin improvement',
    subCategories: []
  },
  {
    id: '2',
    name: 'Hair removal',
    subCategories: []
  },
  {
    id: '3',
    name: 'Soft surgery',
    subCategories: []
  },
  {
    id: '4',
    name: 'Plastic surgery',
    subCategories: []
  }
]

export function Settings() {
  const [activeMenu, setActiveMenu] = useState('Treatments')
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments)
  const [selectedTreatment, setSelectedTreatment] = useState<string>('1')
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTreatments = localStorage.getItem('treatments')
    if (savedTreatments) {
      setTreatments(JSON.parse(savedTreatments))
    }
  }, [])

  const menuItems = ['General', 'Password', 'Price', 'Treatments']

  const handleSave = () => {
    localStorage.setItem('treatments', JSON.stringify(treatments))
    setUnsavedChanges(false)
  }

  const handleAddSubCategory = () => {
    const treatmentIndex = treatments.findIndex(t => t.id === selectedTreatment)
    if (treatmentIndex === -1) return

    const newSubCategory = {
      id: `${selectedTreatment}-${Date.now()}`,
      name: 'New Treatment...'
    }

    const updatedTreatments = [...treatments]
    updatedTreatments[treatmentIndex].subCategories.push(newSubCategory)
    setTreatments(updatedTreatments)
    setUnsavedChanges(true)
  }

  const handleRemoveSubCategory = (treatmentId: string, subCategoryId: string) => {
    const treatmentIndex = treatments.findIndex(t => t.id === treatmentId)
    if (treatmentIndex === -1) return

    const updatedTreatments = [...treatments]
    updatedTreatments[treatmentIndex].subCategories = 
      updatedTreatments[treatmentIndex].subCategories.filter(sc => sc.id !== subCategoryId)
    setTreatments(updatedTreatments)
    setUnsavedChanges(true)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      {/* Settings Menu */}
      <div className="flex border-b">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveMenu(item)}
            className={`px-4 py-2 text-sm font-medium ${
              activeMenu === item 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Treatments Content */}
      {activeMenu === 'Treatments' && (
        <div className="p-6">
          <div className="grid grid-cols-[250px_1fr] gap-6">
            {/* Treatment Categories */}
            <div className="space-y-2">
              {treatments.map((treatment) => (
                <button
                  key={treatment.id}
                  onClick={() => setSelectedTreatment(treatment.id)}
                  className={`w-full text-left px-4 py-2 rounded text-sm ${
                    selectedTreatment === treatment.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {treatment.name}
                </button>
              ))}
            </div>

            {/* Sub Categories */}
            <div className="space-y-4">
              {treatments.find(t => t.id === selectedTreatment)?.subCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <span>{subCategory.name}</span>
                  <button
                    onClick={() => handleRemoveSubCategory(selectedTreatment, subCategory.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {/* Actions */}
              <div className="flex justify-between">
                <button
                  onClick={handleAddSubCategory}
                  className="flex items-center gap-2 text-sm text-blue-600"
                >
                  <Plus className="h-4 w-4" />
                  Select Treatment...
                </button>
                <div className="space-x-4">
                  <button 
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => {
                      const savedTreatments = localStorage.getItem('treatments')
                      if (savedTreatments) {
                        setTreatments(JSON.parse(savedTreatments))
                      } else {
                        setTreatments(initialTreatments)
                      }
                      setUnsavedChanges(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!unsavedChanges}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Menu Items - No Content as per requirements */}
      {activeMenu !== 'Treatments' && (
        <div className="p-6 text-center text-gray-500">
          No content to display
        </div>
      )}
    </div>
  )
}

