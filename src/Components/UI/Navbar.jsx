import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='links'>
            <Link to='/'>Home</Link>
            <Link to='/sorting'>Sorting</Link>
            <Link to='/pathfinding'>Pathfinding</Link>
            </div>
        </nav>
    );
}

export default Navbar