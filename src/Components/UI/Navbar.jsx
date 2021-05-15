import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='topnav-centered'>
            <Link to='/Algo-visualizer'>
                <button className="glow-on-hover sm-btn">
                  Home
                </button>
        </Link>
            <Link to='/sorting'>
                <button className="glow-on-hover sm-btn">
                     Sorting
                </button>
            </Link>
            <Link to='/pathfinding'>
                <button className="glow-on-hover sm-btn">
                   Pathfinding
                 </button>
        </Link>
            </div>
        </nav>
    );
}

export default Navbar