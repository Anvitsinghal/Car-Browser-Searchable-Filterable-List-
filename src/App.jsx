import { useEffect, useState } from "react";
import useCars from "./hooks/useCars";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: Cars,
    loading,
    error,
    retry,
  } = useCars();

  const [data, setData] = useState([]);

  const [search, setsearch] = useState(
    searchParams.get("search") || ""
  );

  const [transmission, setTranismission] = useState(
    searchParams.get("transmission") || ""
  );

  const [Type, setType] = useState(
    searchParams.get("type") || ""
  );

  const [Available, setAvailable] = useState(
    searchParams.get("available") === "true"
  );

  const [sortprice, selectsortprice] = useState(
    searchParams.get("sortPrice") || ""
  );
  const [minprice,setminprice]=useState(searchParams.get("minprice")||"")
   const [maxprice,setmaxprice]=useState(searchParams.get("maxprice")||"")
const [seats,setseats]=useState(searchParams.get("seats")||"")
  const updateURL = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };
  
  useEffect(() => {

    if (
      search.trim() === "" &&
      transmission === "" &&
      Type === "" &&
      sortprice === "" &&
      !Available &&
      minprice=="" && maxprice==""&& seats==""
    ) {
      setData(Cars);
      return;
    }

    const timer = setTimeout(() => {

      const query = search.trim().toLowerCase();

      const filteredData = Cars.filter(
        (car) =>
          car.name.toLowerCase().includes(query) &&
          car.transmission
            .toLowerCase()
            .includes(transmission.toLowerCase()) &&
          car.type
            .toLowerCase()
            .includes(Type.toLowerCase()) &&
          (!Available || car.available) &&
          car.pricePerDay>=(minprice==""?0:minprice) && car.pricePerDay<=(maxprice==""?100000:maxprice) && car.seats==seats
      );

      if (sortprice === "0") {
        filteredData.sort(
          (a, b) => a.pricePerDay - b.pricePerDay
        );
      }

      else if (sortprice === "1") {
        filteredData.sort(
          (a, b) => b.pricePerDay - a.pricePerDay
        );
      }

      setData(filteredData);

    }, 300);

    return () => clearTimeout(timer);

  }, [
    search,
    transmission,
    Type,
    Available,
    sortprice,
    Cars,
    minprice,
    maxprice,
    seats
  ]);
  
  const resetFilters = () => {
    setsearch("");
    setTranismission("");
    setType("");
    setAvailable(false);
    selectsortprice("");

    setSearchParams({});
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">
          Loading cars...
        </p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">

        <p className="text-xl text-red-600 font-semibold">
          Error: {error}
        </p>

        <button
          onClick={retry}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>

      </div>
    );
  }


  return (
    <>

      <div className="p-4">
        
        <input
          type="text"
          placeholder="Search car"
          value={search}
          onChange={(e) => {

            setsearch(e.target.value);

            updateURL(
              "search",
              e.target.value
            );

          }}
          className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg"
        />


        <div className="flex flex-wrap gap-5 mt-4">
          
          <select
            className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4"
            value={Type}
            onChange={(e) => {

              setType(e.target.value);

              updateURL(
                "type",
                e.target.value
              );

            }}
          >

            <option value="">
              --Car Type--
            </option>

            <option value="Economy">
              Economy
            </option>

            <option value="Sedan">
              Sedan
            </option>

            <option value="SUV">
              SUV
            </option>

            <option value="Luxury">
              Luxury
            </option>

          </select>
          <select
            className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4"
            value={transmission}
            onChange={(e) => {

              setTranismission(e.target.value);

              updateURL(
                "transmission",
                e.target.value
              );

            }}
          >

            <option value="">
              --Engine Type--
            </option>

            <option value="Automatic">
              Automatic
            </option>

            <option value="Manual">
              Manual
            </option>

          </select>
          <select
            className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4"
            value={sortprice}
            onChange={(e) => {

              selectsortprice(e.target.value);

              updateURL(
                "sortPrice",
                e.target.value
              );

            }}
          >

            <option value="">
              --Sort Price--
            </option>

            <option value="0">
              Price Low to High
            </option>

            <option value="1">
              Price High to Low
            </option>

          </select>
           <select
            className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4"
            value={seats}
            onChange={(e) => {

              setseats(e.target.value);

              updateURL(
                "seats",
                e.target.value
              );

            }}
          >

            <option value="">
              --Select Seats--
            </option>

            <option value="4">
              4
            </option>

            <option value="5">
             5
            </option>
            <option value="7">
             7
            </option>

          </select>
          <label className="flex items-center gap-2 cursor-pointer select-none">

            <input
              type="checkbox"
              checked={Available}
              onChange={(e) => {

                setAvailable(e.target.checked);

                updateURL(
                  "available",
                  e.target.checked
                    ? "true"
                    : ""
                );

              }}
              className="w-4 h-4 text-blue-600 rounded border-gray-300"
            />

            <span className="text-gray-700 font-medium">
              Available Only
            </span>

          </label>
         <input type="number" value={minprice} onChange={(e)=>{setminprice(e.target.value); updateURL("minprice",e.target.value);}} placeholder="Enter min price"/>
         <input type="number" value={maxprice} onChange={(e)=>{setmaxprice(e.target.value);  updateURL("maxprice",e.target.value); }} placeholder="Enter max price"/>
        </div>
        <div className="mt-4">

          {`Showing ${data.length} of ${Cars.length} cars`}

        </div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.length === 0 && (

          <div>

            <p className="mb-3">
              No cars found.
            </p>

            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Reset Filters
            </button>

          </div>

        )}
        {data.map((value) => (

          <div
            key={value.id}
              onClick={() => navigate(`/cars/${value.id}`)}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >

            <h2 className="text-lg font-semibold mb-3">
              {value.name}
            </h2>


            <div className="space-y-2 text-sm">

              <p>
                <span className="font-medium">
                  Type:
                </span>{" "}

                {value.type}
              </p>


              <p>
                <span className="font-medium">
                  Transmission:
                </span>{" "}

                {value.transmission}
              </p>


              <p>
                <span className="font-medium">
                  Price/Day:
                </span>{" "}

                ₹{value.pricePerDay}
              </p>


              <p>
                <span className="font-medium">
                  Seats:
                </span>{" "}

                {value.seats}
              </p>


              <p>

                <span className="font-medium">
                  Available:
                </span>{" "}

                <span
                  className={`font-semibold ${
                    value.available
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >

                  {value.available
                    ? "YES"
                    : "NO"}

                </span>

              </p>

            </div>

          </div>

        ))}

      </div>

    </>
  );
}

export default App;