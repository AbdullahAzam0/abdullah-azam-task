export interface Treatment {
    id: string
    name: string
    subCategories: SubCategory[]
  }
  
  export interface SubCategory {
    id: string
    name: string
    isSelected?: boolean
  }
  
  export interface TreatmentState {
    treatments: Treatment[]
  }
  
  