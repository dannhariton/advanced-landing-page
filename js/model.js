export const cache = {};

export async function fetchHouseData() {
  const response = await fetch("./js/data/house.json");
  const json = await response.json();
  return json;
}

export async function fetchVillaData() {
  const response = await fetch("./js/data/villa.json");
  const json = await response.json();
  return json;
}

export async function fetchApartmentData() {
  const response = await fetch("./js/data/apartment.json");
  const json = await response.json();
  return json;
}

export async function handleReviews() {
  const response = await fetch("./js/data/reviews.json");
  const json = await response.json();
  return json;
}
