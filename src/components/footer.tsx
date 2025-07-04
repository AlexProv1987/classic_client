import logo from '../logo.svg';

export const Footer = () =>{
    return(
        <nav className="navbar sidebar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Bootstrap" width="30" height="30" />
          </a>
        </div>
      </nav>
    )
}