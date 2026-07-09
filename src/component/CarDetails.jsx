import { useParams } from "react-router-dom";
import useCars from "../hooks/useCars";

function CarDetail() {
  const { id } = useParams();

  const {
    data: Cars,
    loading,
    error,
    retry,
  } = useCars();

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  const car = Cars.find((value) => value.id === Number(id));

  if (!car) {
    return <h2>Car not found</h2>;
  }

  return (
    <div className="p-6">
      <div className="border rounded-lg p-6 shadow-sm bg-white max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{car.name}</h1>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">ID:</span> {car.id}
          </p>

          <p>
            <span className="font-semibold">Type:</span> {car.type}
          </p>

          <p>
            <span className="font-semibold">Transmission:</span>{" "}
            {car.transmission}
          </p>

          <p>
            <span className="font-semibold">Seats:</span> {car.seats}
          </p>

          <p>
            <span className="font-semibold">Price per day:</span> ₹
            {car.pricePerDay}
          </p>

          <p>
            <span className="font-semibold">Available:</span>{" "}
            {car.available ? "YES" : "NO"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;