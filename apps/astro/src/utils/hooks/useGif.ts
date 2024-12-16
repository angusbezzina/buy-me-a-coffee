import { getRandomGif } from "@/utils/giphy";
import React from "react";

export function useGif(index: number = 0) {
  const [gif, setGif] = React.useState<string>();

  React.useEffect(() => {
    const handleGif = async () => {
      const gif = await getRandomGif(index);

      setGif(gif);
    };

    handleGif();
  }, []);

  return { gif };
}
