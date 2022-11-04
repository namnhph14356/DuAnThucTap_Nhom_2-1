import React from 'react'
import ModalContainer from './ModalContainer'

export default function WritersModal({profile = [], visible, onClose}) {
  return (
    <ModalContainer onClose={onClose} visible={visible}>
        {profile.map(({id, name, avatar}) => {
            return (
                <div key={id} className="flex">
                    <img src={avatar} alt={name} />
                    <p>{name}</p>
                </div>
            )
        })}
    </ModalContainer>
  )
}
