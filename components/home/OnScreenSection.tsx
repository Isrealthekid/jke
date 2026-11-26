import { projects } from "@/data/projects";
import OnScreenFilms, { type FeedFilm } from "./OnScreenFilms";

const FEED = "https://films.thejoietv.com/films.json";

// Used only if films.thejoietv.com can't be reached when the site is built.
const backup: FeedFilm[] = projects
  .filter((p) => p.category === "Film")
  .map((p, i) => ({
    id: i + 1,
    title: p.title,
    genre: "",
    year: p.year,
    image: p.thumbnail,
    soon: false,
    isNew: false,
    releaseDate: "",
  }));

/**
 * "On the screen": a live copy of the films on films.thejoietv.com. The list is read from that
 * site's films.json when this site is built, and again in the visitor's browser, so a film added
 * there shows up here too, with its name, year and picture.
 */
export default async function OnScreenSection() {
  let films = backup;
  try {
    const res = await fetch(FEED, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = (await res.json()) as { films?: FeedFilm[] };
      if (Array.isArray(data.films) && data.films.length) films = data.films;
    }
  } catch {
    // keep the backup list
  }
  return <OnScreenFilms initial={films} feed={FEED} />;
}
