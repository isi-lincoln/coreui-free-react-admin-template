import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Resources',
  },
  {
    component: CNavItem,
    name: 'Statistics',
    to: '/stats',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Grafana',
    href: 'http://localhost:3000/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Visualization',
  },
  {
    component: CNavItem,
    name: 'Graph',
    to: '/graph',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Configuration',
  },
  {
    component: CNavGroup,
    name: 'Configuration',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Resources',
        to: '/resources',
      },
      {
        component: CNavItem,
        name: 'Scanner Settings',
        to: '/scanner',
      },
      {
        component: CNavItem,
        name: 'Configure Network',
        to: '/network',
      },
      {
        component: CNavItem,
        name: 'Configure Slice',
        to: '/slice',
      },
      {
        component: CNavItem,
        name: 'Deploy Slice',
        to: '/deploy',
      },
    ],
  },
]

export default _nav
