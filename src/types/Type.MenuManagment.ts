export type Category = 'veg' | 'non-veg' | 'salads';

export interface Dish {
  id: string;
  name: string;
  description: string;
  category: Category;
  isActive: boolean;  // Added for status tracking (active/inactive)
}

export interface FormData {
  id: string;
  name: string;
  description: string;
  category: Category;
  isActive: boolean;  // Added to match the Dish interface
}