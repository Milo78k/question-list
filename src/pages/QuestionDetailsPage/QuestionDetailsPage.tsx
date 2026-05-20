import { useNavigate } from "react-router-dom";

import arrowLeft from "../../assets/icons/Vector-left.svg";
import closeIcon from "../../assets/icons/Close-button.svg";

import { MentorCard } from "../../components/MentorCard/MentorCard";
import { QuestionAnswerCard } from "../../components/QuestionAnswerCard/QuestionAnswerCard";
import { QuestionDetailsHero } from "../../components/QuestionDetailsHero/QuestionDetailsHero";
import { QuestionDetailsNavigation } from "../../components/QuestionDetailsNavigation/QuestionDetailsNavigation";
import { QuestionDetailsSidebar } from "../../components/QuestionDetailsSidebar/QuestionDetailsSidebar";

import { useQuestionDetailsPage } from "../../hooks/useQuestionDetailsPage";

import "./QuestionDetailsPage.scss";

export const QuestionDetailsPage = () => {
  const navigate = useNavigate();

  const { question, isLoading, isSidebarOpen, setIsSidebarOpen } =
    useQuestionDetailsPage();

  if (isLoading) return <p>Загрузка...</p>;
  if (!question) return <p>Вопрос не найден</p>;

  return (
    <section className="question-details">
      <div className="question-details__container">
        <div className="question-details__layout">
          <div className="question-details__main">
            <button
              type="button"
              className="question-details__back"
              onClick={() => navigate(-1)}
            >
              <img src={arrowLeft} alt="Previous" />
              <span>Назад</span>
            </button>

            <QuestionDetailsHero
              question={question}
              onOpenSidebar={() => setIsSidebarOpen(true)}
            />

            <QuestionDetailsNavigation />

            <QuestionAnswerCard
              title="Краткий ответ"
              content={question.shortAnswer}
            />

            <QuestionAnswerCard
              title="Развёрнутый ответ"
              content={question.longAnswer}
              isExpandable
            />

            <div className="question-details__mentor-mobile">
              <MentorCard />
            </div>
          </div>

          <div className="question-details__aside-column">
            <aside
              className={`question-details__sidebar ${
                isSidebarOpen ? "question-details__sidebar--open" : ""
              }`}
            >
              <button
                type="button"
                className="question-details__sidebar-close"
                onClick={() => setIsSidebarOpen(false)}
              >
                <img src={closeIcon} alt="close icon" />
              </button>

              <QuestionDetailsSidebar question={question} />
            </aside>

            <div className="question-details__mentor-desktop">
              <MentorCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
