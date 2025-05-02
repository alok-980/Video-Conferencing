import { useEffect } from "react";
import { useNavigate } from "react-router"

const withAuth = ( WrapComponent ) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        const isAuthenticated = () => {
            if(localStorage.getItem("token")) {
                return true;
            }
            return false;
        }

        useEffect(() => {
            if(!isAuthenticated) {
                router("/auth")
            }
        }, []);

        return <WrapComponent {...props} />
    }

    return AuthComponent
}

export default withAuth;