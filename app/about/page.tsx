import { redirect } from "next/navigation";

// About now lives on the home page, right after the opening screen.
export default function AboutPage() {
  redirect("/#about");
}
