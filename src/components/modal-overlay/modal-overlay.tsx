import { FC } from "react";
import modalOverlayStyles from "./modal-overlay.module.scss";

interface IModalOverlay {
  handleClosePopup: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ handleClosePopup }) => {
  return (
    <div
      className={modalOverlayStyles.container}
      onClick={handleClosePopup}
    ></div>
  );
};

export default ModalOverlay;
