import React from "react";
import { updateReview } from "../../api/review";
import { useNotification } from "../../hooks";
import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";

export default function EditRatingModal({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    const { error, message } = await updateReview(initialState.id, data);
    if (error) return updateNotification("error", error);

    onSuccess({ ...data });
    updateNotification("success", message);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm initialState={initialState} onSubmit={handleSubmit} />
    </ModalContainer>
  );
}
