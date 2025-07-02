import logo from '../logo.svg';

export const Footer = () =>{
    return(
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Bootstrap" width="40" height="40" />
          </a>
        </div>
      </nav>
    )
}