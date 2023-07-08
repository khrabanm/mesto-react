import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name: title, link: link });
    }

    useEffect(() => {
        setTitle("");
        setLink("");
    }, []);


    return (
        <PopupWithForm
          name={"photo"}
          title={"Новое место"}
          submitButtonText={"Создать"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
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
              value={title || ""}  
              onChange={handleChangeTitle}
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
              value={link || ""}  
              onChange={handleChangeLink}
            />
            <span
              className="popup__input-error link-input-error"
              id="source_link-input-error"
            ></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup