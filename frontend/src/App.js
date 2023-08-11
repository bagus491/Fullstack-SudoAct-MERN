import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// router
import {DasbordPage} from '../src/Pages/DasbordPage'
import {LandingPage} from '../src/Pages/LandingPage'
import {LoginPage} from '../src/Pages/LoginPage'
import {NotepadPage} from '../src/Pages/NotepadPage'
import {RegisterPage} from '../src/Pages/RegisterPage'
import {SettingPage} from '../src/Pages/SettingPage'
import {WhislistPage} from '../src/Pages/WhislistPage'
import {NotFoundPage} from '../src/Pages/NotFoundPage'

function App() {
  return (
  <div>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/Register' element={<RegisterPage />}></Route>
        <Route path='/dasbord/:username' element={<DasbordPage />}></Route>
        <Route path='/whislist/:username' element={<WhislistPage />}></Route>
        <Route path='/notepad/:username' element={<NotepadPage />}></Route>
        <Route path='/setting/:username' element={<SettingPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
