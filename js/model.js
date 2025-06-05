export async function handleHouseData() {
  const response = await fetch("./js/data/house.json");
  const json = await response.json();
  return json;
}
