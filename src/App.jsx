import { useEffect, useState } from "react";
import carsdata from "../src/data/Cars.json"
console.log(carsdata)
function App(){
  const [data,setData]=useState(carsdata)
  const [search,setsearch]=useState("")
  const [transmission,setTranismission]=useState("");
  const [Type,setType]=useState("");
  const [Available,setAvailable]=useState(false)
  const [sortprice,selectsortprice]=useState("")
  const [len,setlen]=useState(carsdata.length)
  useEffect(()=>{
   if (search.trim() === ""&& transmission==""&&Type==""&& Available=="") {
    setData(carsdata);
    return;
}
    const timer=setTimeout(() => {
        const query=search.trim().toLowerCase()
        const filteredData = carsdata.filter((car) =>(car.name.toLowerCase().includes(query))&&
      car.transmission.toLowerCase().includes(transmission.toLocaleLowerCase())&&car.type.toLowerCase().includes(Type.toLocaleLowerCase())&&car.available==Available
      );
      setlen(filteredData.length)
      if (sortprice === "0") {
    filteredData.sort((a, b) => a.pricePerDay - b.pricePerDay);
}
else if (sortprice === "1") {
    filteredData.sort((a, b) => b.pricePerDay - a.pricePerDay);
}
     setData(filteredData)
    }, 300);
    return () => clearTimeout(timer);
  }, [search, transmission, Type, Available, sortprice])
  const resetFilters = () => {
    setsearch("");
    setTranismission("");
    setType("");
    setAvailable(false);
    selectsortprice("");
};

  return (
    <>
<div className="p-4">
  <input
    type="text"
    placeholder="Search car"
    value={search}
    onChange={(e) => setsearch(e.target.value)}
    className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg "
  />
  <select onChange={(e)=>setType(e.target.value)}>--Type--
    <option value="">All</option>
    <option value="Economy">Economy</option>
    <option value="Sedan">Sedan</option>
    <option value="SUV">SUV</option>
    <option value="Luxury">Luxury</option>
  </select>
 
   <select onChange={(e)=>setTranismission(e.target.value)}>--Type--
      <option value="">All</option>
    <option value="Automatic">Automatic</option>
    <option value="Manual">Manual</option>
  
  </select>
    <select onChange={(e)=>selectsortprice(e.target.value)}>--Price--
    <option value="0">Price Low to High</option>
    <option value="1">Price High to Low</option>
  
  </select>
   <input
  type="checkbox"
  checked={Available}
  onChange={(e) => setAvailable(e.target.checked)}
/>
   <div>{`Showing ${len} of ${carsdata.length} cars`}</div>
</div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {data.length==0 &&  (
        <>
        <p>No cars found.</p>
        <button onClick={resetFilters}>
            Reset Filters
        </button>
        </>
    )}
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
</>

  );
}
export default App