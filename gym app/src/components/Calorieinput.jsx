import React, { useState } from 'react';

const calorieInput = () => {
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);
  const [foodList, setFoodList] = useState([]); 

  
  const getNutritionInfo = async () => {
    try {
      const headersList = {
        "Accept": "*/*",
        "X-Api-Key": "Uo7DPDfR48kIh15TrCGBkw==QoofaHDaBMbsGN51",
      };

      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${(query)}`, {
        method: 'GET',
        headers: headersList,
      });

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const product = data.items[0]; 
        setNutritionData(product);
        setError(null); 
      } else {
        setError("No results found. Try another search.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  
  const addToList = () => {
    if (nutritionData) {
      setFoodList([...foodList, nutritionData]);
    }
  };


  const calculateTotals = () => {
    return foodList.reduce(
      (totals, food) => {
        totals.calories += food.calories;
        totals.protein += food.protein_g;
        totals.sugar += food.sugar_g;
        return totals;
      },
      { calories: 0, protein: 0, sugar: 0 }
    );
  };

  const totals = calculateTotals();

  return (
        <div className="my-10 min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Nutrition Tracker</h1>
      
      <div className="w-full max-w-md flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for an ingredient"
        />
        <button
          onClick={getNutritionInfo}
          className="bg-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      {nutritionData && (
        <div className="bg-white p-4 rounded-lg shadow w-full max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">Nutrition Information</h2>
          <p><strong>Name:</strong> {nutritionData.name}</p>
          <p><strong>Calories:</strong> {nutritionData.calories} kcal</p>
          <p><strong>Protein:</strong> {nutritionData.protein_g} g</p>
          <p><strong>Sugar:</strong> {nutritionData.sugar_g} g</p>
          <button
            onClick={addToList}
            className="mt-4 bg-green-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add to List
          </button>
        </div>
      )}
      
      <h2 className="text-lg font-semibold mt-6 mb-2">Food List</h2>
      {foodList.length > 0 ? (
        <ul className="bg-white p-4 rounded-lg shadow w-full max-w-md">
          {foodList.map((food, index) => (
            <li key={index} className="flex justify-between py-2 border-b last:border-none">
              <span>{food.name}</span>
              <span className="text-gray-600">{food.calories} kcal, {food.protein_g}g protein, {food.sugar_g}g sugar</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No items added yet.</p>
      )}
      
      <div className="bg-white p-4 rounded-lg shadow w-full max-w-md mt-6">
        <h3 className="text-lg font-semibold mb-2">Total Nutrition</h3>
        <p><strong>Total Calories:</strong> {parseFloat(totals.calories)} kcal</p>
        <p><strong>Total Protein:</strong> {parseFloat(totals.protein)} g</p>
        <p><strong>Total Sugar:</strong> {parseFloat(totals.sugar)} g</p>
      </div>
    </div>
  );
};

export default calorieInput;