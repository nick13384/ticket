import TravelPayouts from "travelpayouts-api";
const api = new TravelPayouts("YOUR_TOKEN", "YOUR_MARKER");

return api
  .search({
    origin: "NYC",
    destination: "HKT",
    date: new Date()
  })
  .then(res => {
    console.log(res.results);
  })
  .catch(err => {
    console.error(err.stack || err.message);
  });
