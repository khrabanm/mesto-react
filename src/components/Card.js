export const Card = ({card, onCardClick}) => {


    return (
    <div className="element">
        <img className="element__image" alt={card.name} src={card.link} onClick={onCardClick}/>
        <button type="button" className="element__trash" />
        <div className="element__text">
          <h2 className="element__title">{card.name}</h2>
          <div className="elements__like-section">
            <button type="button" className="element__like" />
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
    </div>
    );
  };