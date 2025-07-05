
import { BoxArrowRight } from 'react-bootstrap-icons';
import { sessionManager } from '../utils/session-manager';
import Tippy from '@tippyjs/react';

interface NavProps {
  log_out: () => void,
  has_user:boolean,
}

export const NavBar:React.FC<NavProps> = (props) => {
  return (
      <nav className="navbar sidebar">
        <div className="container-fluid">
          <a className="navbar-brand">
          </a>
          <div className="d-flex align-items-center" style={{minHeight:'42px'}}>
            {props.has_user && 
             <Tippy content="Logout" delay={[250, 100]} placement="bottom">
            <BoxArrowRight size={28} color="white" style={{ cursor: 'pointer' }} onClick={()=>props.log_out()}  />
             </Tippy>
            }
          </div>
        </div>
      </nav>
  );
}