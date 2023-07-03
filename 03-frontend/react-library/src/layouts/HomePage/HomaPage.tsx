import React from 'react'
import { ExploreTopBooks } from './components/ExploreTopBooks'
import { Heroes } from './components/Heroes'
import { LibraryServices } from './components/LibraryServices'

import { Carousel } from './components/Carousel'

export const HomaPage = () => {
    return (
        <>
        <ExploreTopBooks />
      <Carousel />
      <Heroes />
      <LibraryServices />
        </>
  )
}
