import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Loading from '../components/Loading';
import LayoutDashBoard from '../components/LayoutDashBoard';

// Components - Routes
// const Users = lazy(() => import('../pages/Users'));
// const Companies = lazy(() => import('../pages/Companies'));
// const All = lazy(() => import('../pages/All'));
// const NotFound = lazy(() => import('../pages/NotFound'));

// export default function RoutesApp() {
//   return (
//     <Router>
//       <LayoutDashBoard>
//         <Suspense fallback={<Loading />}>
//           <Routes>
//             <Route path="/" element={ <Navigate to="/users" /> } />
//             <Route path='/users' element={ <Users /> } />
//             <Route path='/companies' element={ <Companies /> } />
//             <Route path='/all' element={ <All /> } />
//             <Route path='*' element={ <NotFound /> } />
//           </Routes>
//         </Suspense>
//       </LayoutDashBoard>
//     </Router>
//   );
// }

import Companies from '../pages/Companies';
import Users from '../pages/Users';
import All from '../pages/All'
import NotFound from '../pages/NotFound'

export default function RoutesApp() {
  return (
    <Router>
      <LayoutDashBoard>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path='/users' element={<Users />} />
          <Route path='/companies' element={<Companies />} />
          <Route path='/all' element={<All />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </LayoutDashBoard>
    </Router>
  );
}
