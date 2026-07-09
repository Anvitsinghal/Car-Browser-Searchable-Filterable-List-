import { useEffect, useState } from "react";
import getcars from "./api/carsdataApi";
import { useSearchParams } from "react-router-dom";

function App(){
  const [searchParams, setSearchParams] = useSearchParams();
  const [data,setData]=useState([])
  const [search,setsearch]=useState(searchParams.get("search") || "")
  const [transmission,setTranismission]=useState(searchParams.get("transmission") || "");
  const [Type,setType]=useState(searchParams.get("type") || "");
  const [Available,setAvailable]=useState(searchParams.get("available") === "true")
  const [sortprice,selectsortprice]=useState(searchParams.get("sortPrice") || "")
  const [len,setlen]=useState(0)
  const [Loading,setLoading]=useState(false)
  const [Error,setError]=useState("")
  const [Cars,setCars]=useState([])
  useEffect(() => {
  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getcars();

      setCars(result);
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCars();
}, []);
  useEffect(()=>{
    
  if (search.trim() === "" && transmission === "" && Type === "" && sortprice==""&&  !Available) {
    setData(Cars);
    return;
}
    const timer=setTimeout(() => {
        const query=search.trim().toLowerCase()
        const filteredData = Cars.filter((car) =>(car.name.toLowerCase().includes(query))&&
      car.transmission.toLowerCase().includes(transmission.toLocaleLowerCase())&&car.type.toLowerCase().includes(Type.toLocaleLowerCase())&&(!Available || car.available)
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
    setSearchParams({});
};

  return (
    <>
<div className="p-4">
  <input
    type="text"
    placeholder="Search car"
    value={search}
    onChange={(e) => {setsearch(e.target.value)
      const newParams = new URLSearchParams(searchParams);
      if (e.target.value) {
      newParams.set("search", e.target.value);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
    }
    }
    className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg "
  />
  <div className="flex space-between gap-5">
  <select className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 " value={Type} onChange={(e)=>{setType(e.target.value)
     const newParams = new URLSearchParams(searchParams);
      if (e.target.value) {
      newParams.set("type", e.target.value);
    } else {
      newParams.delete("type");
    }
    setSearchParams(newParams);
  }}>--Type--
    <option value="">--Car Type--</option>
    <option value="Economy">Economy</option>
    <option value="Sedan">Sedan</option>
    <option value="SUV">SUV</option>
    <option value="Luxury">Luxury</option>
  </select>
 
   <select className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 " value={transmission} onChange={(e)=>{setTranismission(e.target.value)
    const newaparams=new URLSearchParams(searchParams)
       if (e.target.value) {
      newaparams.set("transmission", e.target.value);
    } else {
      newaparams.delete("transmission");
    }
    setSearchParams(newaparams);
   }}>
      <option value="">--Engine Type--</option>
    <option value="Automatic">Automatic</option>
    <option value="Manual">Manual</option>
  
  </select>
    <select className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 "  value={sortprice} onChange={(e)=>{selectsortprice(e.target.value)
      const newaparams=new URLSearchParams(searchParams)
       if (e.target.value) {
      newaparams.set("sortPrice", e.target.value);
    } else {
      newaparams.delete("sortPrice");
    }
    setSearchParams(newaparams);

    }}>--Price--
    <option value="0">Price Low to High</option>
    <option value="1">Price High to Low</option>
  
  </select>
<label className="flex items-center gap-2 cursor-pointer select-none">
  <input
    type="checkbox"
    checked={Available}
    onChange={(e) => {
      setAvailable(e.target.checked);
      updateURL("available", e.target.checked); 
    }}
    className="w-4 h-4 text-blue-600 rounded border-gray-300 "
  />
  <span className="text-gray-700 font-medium">Available Only</span>
</label>
</div>
   <div>{`Showing ${data.length} of ${Cars.length} cars`}</div>
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