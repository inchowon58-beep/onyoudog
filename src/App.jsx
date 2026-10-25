import { Navigate, Route, Routes } from "react-router-dom";
import { Chrome } from "./components/Chrome.jsx";
import { Home } from "./pages/Home.jsx";
import { BreedIndex, PetDetail, PetList } from "./pages/PetPages.jsx";
import { Consult, ContentPage, GuideDetail, GuideIndex, NotFound, PhilosophyDetail, Place, QnA, Reviews, SearchPage } from "./pages/InfoPages.jsx";
import { LocalPlacesPage } from "./pages/LocalPlacesPage.jsx";
import { RegionLinksPage } from "./pages/RegionLinksPage.jsx";
import { SeoLanding } from "./pages/SeoLanding.jsx";
import { content } from "./data/index.js";

export default function App() {
  return (
    <Chrome>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puppies" element={<PetList type="puppy" />} />
        <Route path="/puppies/premium" element={<Navigate to="/puppies" replace />} />
        <Route path="/puppies/kind" element={<Navigate to="/puppies" replace />} />
        <Route path="/puppies/breeds" element={<BreedIndex type="puppy" />} />
        <Route path="/puppies/breed/:slug" element={<PetList type="puppy" />} />
        <Route path="/kittens" element={<PetList type="kitten" />} />
        <Route path="/kittens/premium" element={<Navigate to="/kittens" replace />} />
        <Route path="/kittens/kind" element={<Navigate to="/kittens" replace />} />
        <Route path="/kittens/breeds" element={<BreedIndex type="kitten" />} />
        <Route path="/kittens/breed/:slug" element={<PetList type="kitten" />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        {Object.entries(content.pages).map(([id, page]) => (
          <Route key={page.path} path={page.path} element={<ContentPage id={id} />} />
        ))}
        <Route path="/guide" element={<GuideIndex />} />
        <Route path="/guide/:slug" element={<GuideDetail />} />
        <Route path="/philosophy/:slug" element={<PhilosophyDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/overseas" element={<Reviews overseas />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/place" element={<Place />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/local-links" element={<RegionLinksPage />} />
        <Route path="/local-places" element={<LocalPlacesPage />} />
        <Route path="/:keyword/:city" element={<SeoLanding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Chrome>
  );
}
