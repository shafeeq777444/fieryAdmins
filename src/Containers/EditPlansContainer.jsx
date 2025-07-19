import PlanCard from "../components/Plans/PlanCard"
import { useGetPlans } from "../services/queries/usePlans";


const EditPlansContainer = () => {
  const { data, isLoading, error } = useGetPlans('fieryGrillss')
  const mealTypeOrder = {'veg' : 0, 'non-veg': 1, 'mixed': 2 };
  const sortedData = data?.slice().sort((a, b) => {
  return mealTypeOrder[a.mealType] - mealTypeOrder[b.mealType];
});
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading plans...</div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading plans</div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8 text-center">Meal Plans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sortedData?.map((plan) => (
          <PlanCard plan={plan}/>
        ))}
      </div>
    </div>
  )
}

export default EditPlansContainer