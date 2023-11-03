import { useSelector } from "react-redux";

function Message() {
    let username = useSelector(gs=>gs.login);

    console.log("username1 = ", username);
    if (username == "")
        return (
            <div>
                <h3>Please Login or SignUp</h3>  
            </div>
        );
    return(
        <div>
            <h3>Welcome, {username}</h3>  
        </div>
    );
}

export default Message;