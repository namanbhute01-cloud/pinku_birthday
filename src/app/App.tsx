import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./AppShell";
import { PageTurnProvider } from "../components/PageTurn";
import { InvitationPage } from "../features/intro/InvitationPage";
import { CoverPage } from "../features/cover/CoverPage";
import { TimelinePage } from "../features/timeline/TimelinePage";
import { ChaosPage } from "../features/chaos-archive/ChaosPage";
import { GalleryPage } from "../features/gallery/GalleryPage";
import { ConstellationPage } from "../features/constellation/ConstellationPage";
import { AppreciationPage } from "../features/appreciation/AppreciationPage";
import { SoundtrackPage } from "../features/soundtrack/SoundtrackPage";
import { LettersPage } from "../features/letters/LettersPage";
import { FuturePlansPage } from "../features/future-plans/FuturePlansPage";
import { FinalePage } from "../features/finale/FinalePage";
import { NotFoundPage } from "../features/not-found/NotFoundPage";
import { ChapterRoute } from "./ChapterRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <PageTurnProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<InvitationPage />} />
            <Route path="cover" element={<CoverPage />} />
            <Route
              path="chapter/beginning"
              element={<ChapterRoute slug="beginning" component={TimelinePage} />}
            />
            <Route
              path="chapter/chaos-archive"
              element={<ChapterRoute slug="chaos-archive" component={ChaosPage} />}
            />
            <Route
              path="chapter/polaroid-wall"
              element={<ChapterRoute slug="polaroid-wall" component={GalleryPage} />}
            />
            <Route
              path="chapter/memory-constellation"
              element={<ChapterRoute slug="memory-constellation" component={ConstellationPage} />}
            />
            <Route
              path="chapter/little-things"
              element={<ChapterRoute slug="little-things" component={AppreciationPage} />}
            />
            <Route
              path="chapter/soundtrack"
              element={<ChapterRoute slug="soundtrack" component={SoundtrackPage} />}
            />
            <Route
              path="chapter/open-when"
              element={<ChapterRoute slug="open-when" component={LettersPage} />}
            />
            <Route
              path="chapter/to-be-continued"
              element={<ChapterRoute slug="to-be-continued" component={FuturePlansPage} />}
            />
            <Route
              path="chapter/final-letter"
              element={<ChapterRoute slug="final-letter" component={FinalePage} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PageTurnProvider>
    </BrowserRouter>
  );
}
