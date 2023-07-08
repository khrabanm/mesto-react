import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([dataUserInfo, dataCard]) => {
        setCurrentUser(dataUserInfo)
        setCards(dataCard)
      })
      .catch((error) => { console.log(`Ошибка при загрузке страницы ${error}`) })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }


  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .addLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => { console.log(`Ошибка при проставлении лайка ${error}`) })
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardId));
      })
      .catch((error) => { console.log(`Ошибка при при удалении фото ${error}`) })
  }

  function handleUpdateUser(dataUserInfo) {
    api
      .patchProfile(dataUserInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => { console.log(`Ошибка при редактировании профиля ${error}`) })

  }

  function handleUpdateAvatar(dataUserInfo) {
    api
      .setUserAvatar(dataUserInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => { console.log(`Ошибка при загрузки фото ${error}`) })
  }

  function handleAddPlaceSubmit(dataCard) {
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((error) => { console.log(`Ошибка при загрузки фото ${error}`) })

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
        <Footer />
        <template id="element"></template>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name='popup_delete'
          title='Вы уверены?'
          nameButton='Да'
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
