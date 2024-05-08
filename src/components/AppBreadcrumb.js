import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {

  return (
    <CBreadcrumb className="my-0">
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
