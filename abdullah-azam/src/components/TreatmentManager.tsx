import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6 space-y-4">
      <button className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-gray-50">General</button>
      <button className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Profile</button>
      <button className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Notifications</button>
      <button className="w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Security</button>
    </div>
  );
};

export function TreatmentManager() {
  const [activeMenu, setActiveMenu] = useState('treatments'); // 'treatments' or 'settings'
  const [treatments, setTreatments] = useState([
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
  ]);
  const [selectedTreatment, setSelectedTreatment] = useState('1');
  const [newSubCategory, setNewSubCategory] = useState('');

  useEffect(() => {
    const savedTreatments = localStorage.getItem('treatments');
    if (savedTreatments) {
      setTreatments(JSON.parse(savedTreatments));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('treatments', JSON.stringify(treatments));
  };

  const handleAddSubCategory = () => {
    if (!newSubCategory.trim()) return;

    const treatmentIndex = treatments.findIndex(t => t.id === selectedTreatment);
    if (treatmentIndex === -1) return;

    const newSubCategoryObject = {
      id: `${selectedTreatment}-${Date.now()}`,
      name: newSubCategory,
    };

    const updatedTreatments = [...treatments];
    updatedTreatments[treatmentIndex].subCategories.push(newSubCategoryObject);
    setTreatments(updatedTreatments);
    setNewSubCategory('');
  };

  const handleRemoveSubCategory = (treatmentId, subCategoryId) => {
    const treatmentIndex = treatments.findIndex(t => t.id === treatmentId);
    if (treatmentIndex === -1) return;

    const updatedTreatments = [...treatments];
    updatedTreatments[treatmentIndex].subCategories = 
      updatedTreatments[treatmentIndex].subCategories.filter(sc => sc.id !== subCategoryId);
    setTreatments(updatedTreatments);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setActiveMenu('treatments')}
          className={`px-4 py-2 rounded-lg text-sm ${
            activeMenu === 'treatments' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
          }`}
        >
          Treatments
        </button>
        <button
          onClick={() => setActiveMenu('settings')}
          className={`px-4 py-2 rounded-lg text-sm ${
            activeMenu === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
          }`}
        >
          Settings
        </button>
      </div>

      {activeMenu === 'treatments' ? (
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
            
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={newSubCategory}
                onChange={(e) => setNewSubCategory(e.target.value)}
                placeholder="Enter new treatment..."
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              />
              <button
                onClick={handleAddSubCategory}
                className="flex items-center gap-2 text-sm text-blue-600"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setNewSubCategory('')}
              >
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
      ) : (
        <Settings />
      )}
    </div>
  );
}