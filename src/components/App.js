import { useState } from "react";
import "../index.css";
import Header from "./Header.js";
import { Main } from "./Main.js";
import Footer from "./Footer.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { ImagePopup } from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
    addKeyDownListener();
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
    addKeyDownListener();
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
    addKeyDownListener();
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    removeKeyDownListener();
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    addKeyDownListener();
  };

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  const addKeyDownListener = () => {
    document.addEventListener("keydown", handleEscClose);
  };

  const removeKeyDownListener = () => {
    document.removeEventListener("keydown", handleEscClose);
  };

  return (
    <>
  <div className="page">
    <Header />
    <Main 
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}/>
    <Footer />
    <template id="element"></template>
    <PopupWithForm
      name={"confirm"}
      title={"Вы уверены?"}
      submitButtonText={"Да"}
      isOpen={false}
      onClose={closeAllPopups}
    ></PopupWithForm>
    <PopupWithForm
          name={"profile"}
          title={"Редактировать профиль"}
          submitButtonText={"Сохранить"}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
      >
        <label>
            <input
              className="popup__input popup__input_type_name"
              placeholder="Имя"
              id="profile_name"
              type="text"
              name="name"
              aria-label="Имя"
              required
              minLength="2"
              maxLength="40"
            />
            <span
              className="popup__input-error name-input-error"
              id="profile_name-input-error"
            ></span>
            </label>
            <label>
            <input
              className="popup__input popup__input_type_description"
              placeholder="Занятие"
              id="Job"
              type="text"
              name="about"
              aria-label="Занятие"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup__input-error discription-input-error " id="Job-input-error"></span>
            </label>
            </PopupWithForm>
        <PopupWithForm
          name={"avatar"}
          title={"Обновить аватар"}
          submitButtonText={"Сохранить"}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label>
            <input
              className="popup__input popup__input_type_url"
              placeholder="Ссылка на картинку"
              id="avatar-source_link"
              type="url"
              name="avatar"
              required
              aria-label="Ссылка на картинку"
            />
            <span
              className="popup__input-error avatar-input-error"
              id="avatar-source_link-input-error"
            ></span>
            </label>
        </PopupWithForm>
        <PopupWithForm
          name={"photo"}
          title={"Новое место"}
          submitButtonText={"Создать"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label>
            <input
              className="popup__input popup__input_type_place"
              placeholder="Название"
              id="place_name"
              type="text"
              name="name"
              aria-label="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span
              className="popup__input-error title-input-error"
              id="place_name-input-error"
            ></span>
            </label>
            <label>
            <input
              className="popup__input popup__input_type_url"
              placeholder="Ссылка на картинку"
              id="source_link"
              type="url"
              name="link"
              required
              aria-label="Ссылка на картинку"
            />
            <span
              className="popup__input-error link-input-error"
              id="source_link-input-error"
            ></span>
            </label>
        </PopupWithForm>
        <ImagePopup
          name={"image"}
          isOpen={!!Object.keys(selectedCard).length}
          onClose={closeAllPopups}
          card={selectedCard}
        />
  </div>
</>

  );
}

export default App;
