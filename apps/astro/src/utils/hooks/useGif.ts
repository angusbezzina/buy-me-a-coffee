import { getRandomGif } from "@/utils/giphy";
import React from "react";

export function useGif() {
  const [gif, setGif] = React.useState<string>();

  React.useEffect(() => {
    const handleGif = async () => {
      const gif = await getRandomGif();

      setGif(gif);
    };

    handleGif();
  }, []);

  return { gif };
}
