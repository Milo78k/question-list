import { BackButton } from "../BackButton/BackButton";
import { MentorCard } from "../MentorCard/MentorCard";
import { QuestionAnswerCard } from "../QuestionAnswerCard/QuestionAnswerCard";
import { QuestionDetailsHero } from "../QuestionDetailsHero/QuestionDetailsHero";
import { QuestionDetailsNavigation } from "../QuestionDetailsNavigation/QuestionDetailsNavigation";
import type { Question } from "../../types/question";

type QuestionDetailsContentProps = {
  question: Question;
  onBack: () => void;
  onOpenSidebar: () => void;
};

export const QuestionDetailsContent = ({
  question,
  onBack,
  onOpenSidebar,
}: QuestionDetailsContentProps) => {
  return (
    <div className="question-details__main">
      <BackButton onClick={onBack} />

      <QuestionDetailsHero question={question} onOpenSidebar={onOpenSidebar} />

      <QuestionDetailsNavigation currentQuestionId={question.id} />

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
  );
};
