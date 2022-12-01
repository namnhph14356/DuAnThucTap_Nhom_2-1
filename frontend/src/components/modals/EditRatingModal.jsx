import React from "react";
import { useParams } from "react-router-dom";
import { useNotification } from "../../hooks";
import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";

export default function EditRatingModal({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {};
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm initialState={initialState} onSubmit={handleSubmit} />
    </ModalContainer>
  );
}
