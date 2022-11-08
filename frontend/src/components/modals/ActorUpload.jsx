import React from 'react'
import ActorForm from '../form/ActorForm'
import ModalContainer from './ModalContainer'

export default function ActorUpload({visible, onClose}) {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
        <ActorForm title='Creat New Actor' btnTitle='Creat' />
    </ModalContainer>
  )
}
