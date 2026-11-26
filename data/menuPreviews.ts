import { projects } from "./projects";

/** What the big preview shows when you hover a menu link. All of it comes from your own work. */
export type MenuPreviewKind =
  | "card" // a brand-colour card with the logo
  | "monitor" // a mini Premiere-style program monitor showing your home screen
  | "clips" // a playful grid of orange, pink and yellow "clip" tiles
  | "stills" // a grid of stills from your projects
  | "posters" // your film posters, stacked
  | "portrait"; // your portrait photo

export interface MenuPreview {
  kind: MenuPreviewKind;
  title?: string;
  blurb?: string;
  /** card only: background colour and text colour */
  color?: string;
  ink?: string;
  /** stills / posters: image URLs */
  images?: string[];
}

export interface MenuItem {
  label: string;
  /** A link. Leave out for a dropdown that only opens its children. */
  href?: string;
  children?: MenuItem[];
  preview: MenuPreview;
}

const films = projects.filter((p) => p.category === "Film");
const videoEdits = projects.filter((p) => p.category === "Video Edit");
const edits = projects.filter((p) => p.category === "Edits");

const thumbs = (list: { thumbnail: string }[]) => list.map((p) => p.thumbnail);

// One of each kind of work, for the "what I do" previews.
const mix = thumbs(
  [films[0], videoEdits[0], edits[0], films[1]].filter(Boolean) as { thumbnail: string }[]
);

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    preview: {
      kind: "clips",
      title: "The Joie TV",
      blurb: "Editing & film, from Lagos.",
    },
  },
  {
    label: "Services",
    href: "/services",
    preview: {
      kind: "clips",
      title: "Creative direction, video & film",
      blurb: "What I can make for you.",
      images: mix,
    },
  },
  {
    label: "My Works",
    // no href: this opens a dropdown
    preview: {
      kind: "clips",
      title: "My Works",
      blurb: "Portfolio and Playground.",
      images: mix,
    },
    children: [
      {
        label: "Portfolio",
        href: "/work",
        preview: {
          kind: "clips",
          title: "Portfolio",
          blurb: "Films, edits and campaigns.",
          images: thumbs([...films.slice(0, 2), ...videoEdits.slice(0, 1), ...edits.slice(0, 1)]),
        },
      },
      {
        label: "Playground",
        href: "/playground",
        preview: {
          kind: "clips",
          title: "Playground",
          blurb: "Carousels, designs and motion.",
        },
      },
    ],
  },
  {
    label: "Films",
    // Opens the films site (a separate website), not a page of this one.
    href: "https://films.thejoietv.com",
    preview: {
      kind: "clips",
      title: "Joie TV Productions",
      blurb: "Watch the films.",
      images: thumbs(films.slice(0, 4)),
    },
  },
  {
    label: "Contact",
    href: "/contact",
    preview: {
      kind: "clips",
      title: "Let’s talk",
      blurb: "Tell me about your project.",
    },
  },
];
