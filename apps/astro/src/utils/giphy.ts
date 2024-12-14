import { GIPHY_GIF_BY_ID_URL, GIPHY_RANDOM_GIF_URL } from "@/utils/constants";
import { getPathWithParams } from "@/utils/routes";

export async function getRandomGif() {
  try {
    const response = await fetch(GIPHY_RANDOM_GIF_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch random GIF");
    }

    const data = await response.json();

    const gif = data.data.images.original.url;

    return gif;
  } catch (error) {
    console.error(error);
    // NOTE: Fail quietly...
  }
}

export async function getGifById(id: string) {
  try {
    const response = await fetch(getPathWithParams(GIPHY_GIF_BY_ID_URL, { id }));

    if (!response.ok) {
      throw new Error("Failed to fetch  GIF");
    }

    const data = await response.json();

    const gif = data.data.images.original.url;

    return gif;
  } catch (error) {
    console.error(error);
    // NOTE: Fail quietly...
  }
}
