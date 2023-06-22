import { Popup } from "./Popup";


export const ImagePopup = ({name, isOpen, onClose, card}) => {

  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
    >
        <img src={card.link}  className="popup__image" alt={card.name} />
        <h2 className="popup__heading">{card.name}</h2>
    </Popup>
  )};
