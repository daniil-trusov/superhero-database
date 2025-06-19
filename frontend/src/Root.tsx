import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import {
  HeroesPage,
  HeroDetailsPage,
  HeroCreatePage,
  HeroEditPage,
  NotFoundPage,
} from './pages';

export function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/heroes" element={<App />}>
          <Route index element={<HeroesPage />} />
          <Route path="create" element={<HeroCreatePage />} />
          <Route path=":id" element={<HeroDetailsPage />} />
          <Route path=":id/edit" element={<HeroEditPage />} />
          <Route path="not-found" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/heroes" replace />} />
      </Routes>
    </Router>
  );
}
