import { Link } from 'react-router-dom';
import '../styles/layout.css';
import { AiFillHome } from 'react-icons/ai';
import { RiMenuFill } from 'react-icons/ri';

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <Link to="/" className="home-button">
                    <AiFillHome size={24} />
                </Link>
                <h1 className="navbar-title">Kiosk</h1>
                <Link to="/menu" className="menu-button">
                    <RiMenuFill size={24} />
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;