import { Pagination } from "../../components/Pagination/Pagination";
import { QuestionList } from "../../components/QuestionList/QuestionList";
import { SidebarFilters } from "../../components/SidebarFilters/SidebarFilters";
import filterIcon from "../../assets/icons/Filter-button.svg";
import closeIcon from "../../assets/icons/Close-button.svg";
import { useQuestionsPage } from "../../hooks/useQuestionsPage";
import "./QuestionsPage.scss";

export const QuestionsPage = () => {
  const {
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
  } = useQuestionsPage();

  return (
    <section className="questions-page">
      <div className="questions-page__container">
        <div className="questions-page__content">
          <div className="questions-page__header">
            <h1 className="questions-page__title">Вопросы React, JavaScript</h1>

            <button
              type="button"
              className="questions-page__filter-button"
              onClick={() => setIsFiltersOpen(true)}
            >
              <img src={filterIcon} alt="Filter icon" />
            </button>
          </div>

          {isLoading && <p>Загрузка...</p>}

          {errorMessage && <p>{errorMessage}</p>}

          {!isLoading && !errorMessage && questionsData && (
            <>
              <QuestionList questions={questionsData.data} />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>

        <aside
          className={`questions-page__sidebar ${
            isFiltersOpen ? "questions-page__sidebar--open" : ""
          }`}
        >
          <button
            type="button"
            className="questions-page__sidebar-close"
            onClick={() => setIsFiltersOpen(false)}
          >
            <img src={closeIcon} alt="Close icon" />
          </button>

          <SidebarFilters filters={filters} onChange={changeFilters} />
        </aside>
      </div>
    </section>
  );
};
