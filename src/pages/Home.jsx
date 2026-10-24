import { HomeMainContent } from "../components/HomeMainContent.jsx";
import { usePageTitle } from "../usePageTitle.js";

export function Home() {
  usePageTitle("");
  return <HomeMainContent />;
}
