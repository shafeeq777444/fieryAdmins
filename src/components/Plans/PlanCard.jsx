import React, { useState } from 'react'
import PlanEditModal from './PlanEditModal'


const PlanCard = ({plan}) => {
  const [editModal,setEditModal]=useState(false)
  return (<>
    <div 
            key={plan._id} 
            className="bg-white border-2 border-black rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-bold text-black mb-2">{plan.title}</h3>
              <div className="flex justify-between items-center">
                <span className="bg-black text-white px-3 py-1 rounded-md text-sm font-medium">
                  {plan.planType}
                </span>
                <span className={`px-3 py-1 rounded-md text-sm font-medium border-2 ${
                  plan.mealType === 'veg' ? 'border-green-600 text-green-600' :
                  plan.mealType === 'non-veg' ? 'border-red-600 text-red-600' :
                  'border-gray-600 text-gray-600'
                }`}>
                  {plan.mealType}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 h-40">
              <ul className="space-y-2">
                {plan.description?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="border-t-2 border-gray-200 pt-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-black">${plan.price}</span>
                <span className="text-gray-600 text-sm">per {plan.pricePer}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={()=>{setEditModal(true)}} className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium">
                Edit Plan
              </button>
              {/* <button className="flex-1 border-2 border-black text-black py-2 px-4 rounded-md hover:bg-black hover:text-white transition-colors duration-200 font-medium">
                Delete
              </button> */}
            </div>

            {/* Footer Info */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500">
                <span>ID: {plan._id.slice(-6)}</span>
                <span>Updated: {new Date(plan.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          {editModal&& <PlanEditModal planId={plan._id} editModal={editModal} setEditModal={setEditModal}/>}

          </>
  )
}

export default PlanCard
