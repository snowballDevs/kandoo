import './App.css';
import {ToastContainer} from 'react-toastify';
import {useRoutingContext} from './contexts/RoutingContext/routingContext';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Workspace from './pages/Workspace/layout/Workspace';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const {currentPage} = useRoutingContext();

    return (
        <div className='bg-primaryLight min-h-screen'>
            {/* Toast Container should be stated once in App root */}
            <ToastContainer />
            {currentPage === 'landingPage' && <LandingPage />}
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'workspace' && <Workspace />}
        </div>
    );
};

export default App;
