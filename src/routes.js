import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Stats = React.lazy(() => import('./views/pages/misc/Stats'))
const Graph = React.lazy(() => import('./views/pages/misc/Graph'))
const Grafana = React.lazy(() => import('./views/pages/misc/Grafana'))
const Network = React.lazy(() => import('./views/pages/misc/Network'))
const Resources = React.lazy(() => import('./views/pages/misc/Resources'))
const Scanner = React.lazy(() => import('./views/pages/misc/Scanner'))
const Slice = React.lazy(() => import('./views/pages/misc/Slice'))
const Deploy = React.lazy(() => import('./views/pages/misc/Deploy'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/stats/*', name: 'Stats', element: Stats },
  { path: '/resources/*', name: 'Resources', element: Resources },
  { path: '/network/*', name: 'Network', element: Network },
  { path: '/graph/*', name: 'Graph', element: Graph },
  { path: '/grafana/*', name: 'Grafana', element: Grafana },
  { path: '/slice/*', name: 'Slice', element: Slice },
  { path: '/scanner/*', name: 'Scanner', element: Scanner },
  { path: '/deploy/*', name: 'Scanner', element: Deploy },
]

export default routes
