import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// router
import {DasbordPage} from '../src/Pages/DasbordPage'
import {LandingPage} from '../src/Pages/LandingPage'
import {LoginPage} from '../src/Pages/LoginPage'
import {NotepadPage} from '../src/Pages/NotepadPage'
import { NotepadDetail } from './Pages/NotepadDetail'
import {RegisterPage} from '../src/Pages/RegisterPage'
import {SettingPage} from '../src/Pages/SettingPage'
import {WhislistPage} from '../src/Pages/WhislistPage'
import {NotFoundPage} from '../src/Pages/NotFoundPage'

//use
import { AuthProvider } from './AuthContext'

function App() {
  return (
  <div>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/Register' element={<RegisterPage />}></Route>
        <Route path='/dasbord/:username' element={<DasbordPage />}></Route>
        <Route path='/whistlist/:username' element={<WhislistPage />}></Route>
        <Route path='/notepad/:username' element={<NotepadPage />}></Route>
        <Route path='/notepad/:username/:id' element={<NotepadDetail />}></Route>
        <Route path='/setting/:username' element={<SettingPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
      </AuthProvider>
    </Router>
  </div>
  );
}

export default App;
