import GameTypes from "@/constants/GameTypes";
import GamePage from "@/pages/Game";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const GameForm = React.lazy(() => import("@/components/GameForm"));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/g/:x/:y/:mines"
          element={
            <Suspense>
              <GamePage />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense>
              <GameForm boards={GameTypes} />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
