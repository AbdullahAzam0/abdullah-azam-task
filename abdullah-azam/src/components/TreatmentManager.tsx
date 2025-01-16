'use client'

import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { SubCategory, Treatment } from '../types/treatments'

export function TreatmentManager() {
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: '1',
      name: 'Skin improvement',
      subCategories: [
        { id: '1-1', name: 'Chemical Peels' },
        { id: '1-2', name: 'Microdermabrasion' },
        { id: '1-3', name: 'Laser Treatments' },
        { id: '1-4', name: 'Light Therapies' },
      ]
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
  ])

  const [selectedTreatment, setSelectedTreatment] = useState<string>('1')

  useEffect(() => {
    const savedTreatments = localStorage.getItem('treatments')
    if (savedTreatments) {
      setTreatments(JSON.parse(savedTreatments))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('treatments', JSON.stringify(treatments))
  }

  const handleAddSubCategory = () => {
    const treatmentIndex = treatments.findIndex(t => t.id === selectedTreatment)
    if (treatmentIndex === -1) return

    const newSubCategory: SubCategory = {
      id: `${selectedTreatment}-${Date.now()}`,
      name: 'New Treatment...',
      isSelected: true
    }

    const updatedTreatments = [...treatments]
    updatedTreatments[treatmentIndex].subCategories.push(newSubCategory)
    setTreatments(updatedTreatments)
  }

  const handleRemoveSubCategory = (treatmentId: string, subCategoryId: string) => {
    const treatmentIndex = treatments.findIndex(t => t.id === treatmentId)
    if (treatmentIndex === -1) return

    const updatedTreatments = [...treatments]
    updatedTreatments[treatmentIndex].subCategories = 
      updatedTreatments[treatmentIndex].subCategories.filter((sc: { id: string }) => sc.id !== subCategoryId)
    setTreatments(updatedTreatments)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-[300px_1fr] gap-6">
        <div className="space-y-4">
          {treatments.map((treatment) => (
            <button
              key={treatment.id}
              onClick={() => setSelectedTreatment(treatment.id)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                selectedTreatment === treatment.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {treatment.name}
            </button>
          ))}
        </div>

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
          
          <div className="flex justify-between">
            <button
              onClick={handleAddSubCategory}
              className="flex items-center gap-2 text-sm text-blue-600"
            >
              <Plus className="h-4 w-4" />
              Select Treatment...
            </button>
            <div className="space-x-4">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

