import logo from '../logo.svg';

export const Footer = () =>{
    return(
        <nav className="navbar sidebar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Bootstrap" width="28" height="28" />
          </a>
        </div>
      </nav>
    )
}