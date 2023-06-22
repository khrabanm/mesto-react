import { useEffect, useState } from "react";
import api from "../utils/Api";
import { Card } from "./Card";

export const Main = ({ onEditProfile, onAddPlace, onEditAvatar,onCardClick }) => {
  const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userData = await api.getProfile();
        setUserData(userData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setUserData]);

  useEffect(() => {
    (async () => {
      try {
        const userData = await api.getInitialCards();
        setCards(userData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setCards]);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userData.avatar} alt="аватарка пользователя" />
          <button
            type="button"
            aria-label="edit-avatar"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          />
        </div>
        <div>
          <div className="profile__info">
            <h1 className="profile__name">{userData.name}</h1>
            <button type="button" onClick={onEditProfile} className="profile__edit-button" />
          </div>
          <p className="profile__description">{userData.about}</p>
        </div>
        <button type="button" value=" " onClick={onAddPlace} className="profile__add-button" />
      </section>
      <section className="elements" aria-label="Картиночки красивых мест">

        {cards.map((card) =>
        <Card key={card._id} 
        card={card} 
        onCardClick={()=>onCardClick(card)}
        />)}

      </section>
    </main>
  );
}

export default Main;