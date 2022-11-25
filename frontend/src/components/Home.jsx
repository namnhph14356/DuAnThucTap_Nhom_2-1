import React from 'react'
import NotVerified from './user/NotVerified'
import TopRateMovies from './user/TopRatedMovies'
import Container from './Container'

export default function Home() {
  return (
  <div className='dark:bg-primary bg-white min-h-screen'>
    <Container>
      <NotVerified />
      {/* sline*/}
      {/*Most rated movies*/}
      <TopRateMovies />
    </Container>
  </div>
  )  
}
