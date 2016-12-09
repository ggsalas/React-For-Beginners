import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss } from 'react-router'

// Components
import './css/style.css'
import Home from './components/Home'
import Admin from './components/Admin'
import Site from './components/Site'
import NotFound from './components/NotFound'

// Router
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/site/:siteId" component={Site} />
        <Match pattern="/admin/:userId" component={Admin} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector('#root'))


