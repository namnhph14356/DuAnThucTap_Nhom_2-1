import React from 'react'

export default function Home() {
  const {authInfo} = useAuth()
  const {isLoggedIn} = authInfo;
  const isVerified = authInfo.profile?.isVerified; 

  const navigate = useNavigate();

  const navigateToverification = () => {
    navigate('/auth/verification', {state: {user: authInfo.profile }})
  }
  return (
    <Container>
      {isLoggedIn && !isVerified ? (<p className='text-lg text-center bg-blue-50 p-2'>It looks like you haven't verified your account, {''}
        <button onClick={navigateToverification} className='text-blue-500 font-semibold hover:underline'>Click here to verify your account.</button>
      </p> ) : null}
    </Container>
  )
}
