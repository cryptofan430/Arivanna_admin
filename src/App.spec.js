// src/App.spec.js
/* global cy */
import * as React from 'react'
import { mount } from '@cypress/react'
import App from './App'

import Main from "./Entryfile/Main";

import LoginPage from './initialpage/loginpage';

it('renders learn react link', () => {
  mount(<Main />)
  cy.contains(/learn react/i)
})