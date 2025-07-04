import './App.css';
import { NavBar } from './components/nav';
import { Footer } from './components/footer';
import { Main } from './pages/main';
import { useSessionState } from './hooks';
import { AuthPage } from './pages/auth';
import { Session } from './common/interfaces';
import { GetSupport } from './components/fab';

function App() {
  const [user, setUser] = useSessionState<Session | null>('session', null);
  
  
  return (

    <div className="bg-light container-fluid" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: 0,
      margin: 0,
    }}>
      
      {/*Fab*/}
      {user && <GetSupport />}

      {/**Nav Bar**/}
      <NavBar />

      {/**Main**/}
      <div className='container-fluid' style={{ flex: 1 }}>
      {user ? 
      <Main /> : 
      <AuthPage
      set_has_token={setUser}
      />}
      </div>

      {/**Footer**/}
     <Footer/>
    </div>

  );
}

export default App;

