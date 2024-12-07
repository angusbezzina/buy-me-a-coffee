import { GIPHY_RANDOM_GIF_URL } from "@/utils/constants";

export async function getRandomGif() {
  try {
    const response = await fetch(GIPHY_RANDOM_GIF_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch random GIF");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    // NOTE: Fail quietly...
  }
}

export async function getGifById(id: string) {
  try {
    const response = await fetch(GIPHY_RANDOM_GIF_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch random GIF");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    // NOTE: Fail quietly...
  }
}
