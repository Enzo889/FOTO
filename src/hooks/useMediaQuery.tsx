import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Set the initial state
    setMatches(mediaQuery.matches);

    // Add the listener
    mediaQuery.addEventListener("change", handler);

    // Clean up the listener on unmount
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
