import { useState } from "react";
import carsdata from "../src/data/Cars.json"
console.log(carsdata)
function App(){
  const [data,setData]=useState(carsdata)
  return (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  {data?.map((value) => (
    <div
      key={value?.id}
      className="border rounded-lg p-4 shadow-sm bg-white"
    >
      <h2 className="text-lg font-semibold mb-3">{value?.name}</h2>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Type:</span> {value?.type}
        </p>
        <p>
          <span className="font-medium">Transmission:</span>{" "}
          {value?.transmission}
        </p>
        <p>
          <span className="font-medium">Price/Day:</span> ₹
          {value?.pricePerDay}
        </p>
        <p>
          <span className="font-medium">Seats:</span> {value?.seats}
        </p>
        <p>
          <span className="font-medium">Available:</span>{" "}
          <span
            className={`font-semibold ${
              value?.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {value?.available ? "YES" : "NO"}
          </span>
        </p>
      </div>
    </div>
  ))}
</div>
  );
}
export default App