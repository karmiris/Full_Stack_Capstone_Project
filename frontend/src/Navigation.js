import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function Navigation() {
    let isAdmin = useSelector(gs=>gs.isAdmin);
    let username = useSelector(gs=>gs.login);

    if (username == "")
        return (
            <div>
                <Link to="/login">
                    <button type="button" className="btn btn-primary">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button type="button" className="btn btn-warning">
                        SignUp
                    </button>
                </Link>
            </div>
        );
    if (isAdmin) {
        return(
            <div>
                <Link to="/home">
                    <button type="button" className="btn btn-primary">
                        Home
                    </button>
                </Link>
                <Link to="/manageCategories">
                    <button type="button" className="btn btn-warning">
                        Categories
                    </button>
                </Link>
                <Link to="/viewUsers">
                    <button type="button" className="btn btn-secondary">
                        View All Users
                    </button>
                </Link>
                <Link to="/changePass">
                    <button type="button" className="btn btn-danger">
                        Change Password
                    </button>
                </Link>
                <Link to="/logout">
                    <button type="button" className="btn btn-info">
                        Logout
                    </button>
                </Link>
            </div>
        );
    }
    return(
        <div>
            <Link to="/home">
                    <button type="button" className="btn btn-primary">
                        Home
                    </button>
                </Link>
                <Link to="/changePass">
                    <button type="button" className="btn btn-danger">
                        Change Password
                    </button>
                </Link>
                <Link to="/logout">
                    <button type="button" className="btn btn-info">
                        Logout
                    </button>
                </Link>
        </div>
    );
}

export default Navigation;