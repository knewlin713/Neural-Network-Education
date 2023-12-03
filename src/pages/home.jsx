import Header from '../components/header';
import { useNavigate } from "react-router-dom";

export default function Home(){
    let navigate = useNavigate();
    const handleRouteChange = () => {
        navigate('/about'); //when we choose the path to navigate to, use / + route_name
    }
    return(
        <div>
            <Header />
            <h2> Home page</h2>
            <button onClick={handleRouteChange}>About</button>
        </div>
    )
}
