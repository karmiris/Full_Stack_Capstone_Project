import { useSelector } from "react-redux";

function Message() {
    let username = useSelector(gs=>gs.login);

    if (username == "")
        return (
            <div>
                <h6>Please Login or SignUp</h6>
            </div>
        );
    return(
        <div>
            <h6>Welcome <b>{username}</b></h6>
        </div>
    );
}

export default Message;