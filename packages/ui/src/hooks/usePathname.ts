import { useEffect, useState } from "react";

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate", handleLocationChange);
    window.addEventListener("replacestate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
      window.removeEventListener("replacestate", handleLocationChange);
    };
  }, []);

  return pathname;
}
