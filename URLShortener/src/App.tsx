import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';

import Dashboard from './app/Dashboard';
import { Auth, CreateURL, RedirectUser, ViewLink } from './Pages';

import app from './firebase.config';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (
        !user &&
        (window.location.pathname === '/' ||
          window.location.pathname === '/link/create'
          || window.location.pathname.includes("/view")
          )
      )
        return navigate('/auth');

      setUser({
        email: user?.email,
        uid: user?.uid,
        name: user?.displayName
      });
    });
  }, [window.location.pathname]);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/:id" element={<RedirectUser />} />
        <Route path="/link/create" element={<CreateURL />} />
        <Route path="/link/:id/view" element={<ViewLink user={user} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
