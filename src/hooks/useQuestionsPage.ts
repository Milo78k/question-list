import { useEffect, useState } from "react";
import { getPublicQuestions } from "../api/questionsApi";
import type { QuestionResponse } from "../types/question";
import type { QuestionFilters } from "../types/questionFilters";
import { useDebounce } from "./useDebounce";

const LIMIT = 10;

export const useQuestionsPage = () => {
  const [questionsData, setQuestionsData] = useState<QuestionResponse | null>(
    null,
  );

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [filters, setFilters] = useState<QuestionFilters>({
    search: "",
    specializationSlug: "",
    skills: [],
    complexity: [],
    rate: [],
    status: "Все",
  });

  const debouncedSearch = useDebounce(filters.search, 400);

  const changeFilters = <K extends keyof QuestionFilters>(
    key: K,
    value: QuestionFilters[K],
  ) => {
    setCurrentPage(1);

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getPublicQuestions({
          page: currentPage,
          limit: LIMIT,
          filters: {
            search: debouncedSearch,
            specializationSlug: filters.specializationSlug,
            skills: filters.skills,
            complexity: filters.complexity,
            rate: filters.rate,
            status: filters.status,
          },
        });

        setQuestionsData(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Не удалось загрузить вопросы");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [
    currentPage,
    debouncedSearch,
    filters.specializationSlug,
    filters.skills,
    filters.complexity,
    filters.rate,
    filters.status,
  ]);

  const totalPages = questionsData
    ? Math.ceil(questionsData.total / questionsData.limit)
    : 1;

  return {
    questionsData,
    isFiltersOpen,
    setIsFiltersOpen,
    currentPage,
    setCurrentPage,
    isLoading,
    errorMessage,
    filters,
    changeFilters,
    totalPages,
  };
};
