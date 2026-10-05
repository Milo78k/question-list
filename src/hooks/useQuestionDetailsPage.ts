import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getQuestionBySlug } from "../api/questionsApi";

import type { Question } from "../types/question";

export const useQuestionDetailsPage = () => {
  const { slug } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();
    const loadQuestion = async () => {
      try {
        setIsLoading(true);
        setQuestion(null);
        setErrorMessage("");
        const data = await getQuestionBySlug(slug, controller.signal);
        if (!controller.signal.aborted) setQuestion(data);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setErrorMessage("Не удалось загрузить вопрос. Попробуйте обновить страницу.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadQuestion();
    return () => controller.abort();
  }, [slug]);

  return {
    question,
    errorMessage,
    isLoading,
    isSidebarOpen,
    setIsSidebarOpen,
  };
};
