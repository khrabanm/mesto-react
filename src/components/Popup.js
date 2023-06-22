export const Popup = ({name, children, isOpen, onClose}) => {
  


    return (
      <div className={`popup popup_${name} ${isOpen&&'popup_opened'}`}>
        <div className={`popup__container popup__container_${name}`}>
          <button
            type="button"
            className="popup__close-icon"
            aria-label="Close"
            onClick={onClose}
          ></button>
          {children}
        </div>
      </div>
    );
  };