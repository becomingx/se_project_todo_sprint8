//put this kind of stuff here:

/*
import { cardList, items } from "./constants.js";
import DefaultCard from "../components/DefaultCard.js";
import HorizontalCard from "../components/HorizontalCard.js";

export const renderElements = (isGrid) => {
  cardList.innerHTML = "";
  items.forEach((item) => {
    const card = isGrid
      ? new DefaultCard(item, ".default-card")
      : new HorizontalCard(item, ".horizontal-card");

    const cardElement = card.generateCard();
    cardList.append(cardElement);
  });
};

*/

//PSEUDOCODE
export const renderElements = (isPopupPseudo) => {
    popupList.innerHTML = "";
    items.forEach((item) => {
        const popupPseudo = new isPopupPseudo();
        const popupWithFormPseudo = popupPseudo.generatePopupPseudo();
        popupList.append(popupWithFormPseudo);
    })
}