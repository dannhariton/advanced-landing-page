export async function handleHouseData() {
  const response = await fetch("./js/data/house.json");
  const json = await response.json();
  return json;
}

export async function handleVillaData() {
  const response = await fetch("./js/data/villa.json");
  const json = await response.json();
  return json;
}

export async function handleApartmentData() {
  const response = await fetch("./js/data/apartment.json");
  const json = await response.json();
  return json;
}

export async function handleReviews() {
  const response = await fetch("./js/data/reviews.json");
  const json = await response.json();
  return json;
}

export async function handleArticles() {
  const response = await fetch("./js/data/articles.json");
  const json = await response.json();
  return json;
}
