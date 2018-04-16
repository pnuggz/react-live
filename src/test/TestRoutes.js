
import React from 'react';
import { Route } from 'react-router-dom';

import Signup from '../components/templates/Signup'

const TestRoutes = () => (
  <div>
    <Route path='/signup' exact component={Signup} />
  </div>
);

export default TestRoutes;
