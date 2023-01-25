import {useDispatch} from "react-redux";
import {authActions} from "../Store/auth-slice";
import {useHistory} from "react-router-dom";

const useLogout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    fetch("http://localhost:8080/auth", {credentials: "include"})
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (!res.isAuth) {
                fetch("http://localhost:8080/users/logout", {
                    credentials: "include",
                }).then(() => {
                    dispatch(authActions.logout());
                    history.push("/login");
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export default useLogout;