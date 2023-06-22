import { Popup } from "./Popup";


export const PopupWithForm = ({ name, title, submitButtonText, children, isOpen, onClose}) => {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className={`popup__form popup__form_${name}`} name={name} noValidate>
        {children}
        <button
          type="submit"
          className="popup__submit-button"
          aria-label="Сохранить"
        >
          {submitButtonText}
        </button>
      </form>
    </Popup>
  );
};