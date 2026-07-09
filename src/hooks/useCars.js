import { useEffect, useState } from "react";
import getcars from "../api/carsdataApi";

function useCars() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getcars();

      setData(result);
    } catch (error) {
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const retry = () => {
    fetchCars();
  };

  return {
    loading,
    error,
    data,
    retry,
  };
}

export default useCars;