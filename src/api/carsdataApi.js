import carsdata from "../data/Cars.json";

async function getcars() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.2;
      if (shouldFail) {
        reject(new Error("API error"));
      } else {
        resolve(carsdata);
      }
    }, 2000);
  });
}

export default getcars;