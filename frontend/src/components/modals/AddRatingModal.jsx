import React from 'react'
import { useParams } from 'react-router-dom'
import { addReview } from '../../api/review'
import { useNotification } from '../../hooks'
import RatingForm from '../form/RatingForm'
import ModalContainer from './ModalContainer'


export default function AddRatingModal({ visible, onClose }) {
    const { movieId } = useParams()
    const { updateNotification } = useNotification();

    const handleSubmit = async (data) => {
        const { error, message } = await addReview(movieId, data)
        if (error) return updateNotification("error", error)
        updateNotification("success", message)
        onClose()
    }
    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
            <RatingForm onSubmit={handleSubmit} />
        </ModalContainer>
    )
}
