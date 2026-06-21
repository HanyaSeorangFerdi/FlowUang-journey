const API_URL = "1C4o5N_poO6E-g6xoBJ0r4FCwXnf9p02I9Rt5F-Uhev8";

export async function getData() {

  const response = await fetch(API_URL);

  const result = await response.json();

  return result.data;

}

export async function saveData(data) {

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

}
