import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://pulwar.isi.edu" target="_blank" rel="noopener noreferrer">
          Sabres
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
