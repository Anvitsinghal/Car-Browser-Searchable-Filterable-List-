import carsdata from "../data/Cars.json";

async function getcars() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        reject(new Error("Failed to fetch cars"));
      } else {
        resolve(carsdata);
      }
    }, 1000);
  });
}

export default getcars;