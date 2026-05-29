import { createBrowserRouter } from "react-router-dom";

import { Layout } from "../components/Layout/Layout";

import { QuestionsPage } from "../pages/QuestionsPage/QuestionsPage";
import { QuestionDetailsPage } from "../pages/QuestionDetailsPage/QuestionDetailsPage";
import { NotFound } from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <QuestionsPage />,
      },

      {
        path: "questions/:slug",
        element: <QuestionDetailsPage />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
