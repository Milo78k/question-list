import arrowLeft from "../../assets/icons/Vector-left.svg";
import arrowRight from "../../assets/icons/Vector-right.svg";

export const QuestionDetailsNavigation = () => {
  return (
    <div className="question-details__navigation">
      <button type="button" className="question-details__nav-button">
        <img src={arrowLeft} alt="Previous" />
        <span>Предыдущий</span>
      </button>

      <button type="button" className="question-details__nav-button">
        <span>Следующий</span>
        <img src={arrowRight} alt="Next" />
      </button>
    </div>
  );
};
