import './App.css';
import {useState} from 'react';
// import {useAuthContext} from './contexts/AuthContext/authContext';
import {useRoutingContext} from './contexts/RoutingContext/routingContext';
import LandingPage from './features/LandingPage';
import Footer from './components/Footer';
import Header from './components/Header';
// import Form from './components/Form';
import KanbanBoard from './components/KanbanBoard';
import Dashboard from './features/Dashboard';
import Workspace from './features/Workspace';

const App = () => {
    // const {isAuthenticated} = useAuthContext();
    const {currentPage} = useRoutingContext();
    const [clickedCardId, setClickedCardId] = useState(null); // State for card ID

    return (
        <div>
            <Header />
            {currentPage === 'landingPage' && <LandingPage />}
            {currentPage === 'dashboard' && (
                <Dashboard
                    clickedCardId={clickedCardId}
                    setClickedCardId={setClickedCardId}
                />
            )}
            {currentPage === 'workspace' && <Workspace />}
            {/* <div className='container mx-auto mt-8 mb-16'>
                <h1 className='text-2xl text-center font-bold mb-4'>
                    Form Example
                </h1>
                <Form />
            </div> */}
            <Footer />
        </div>
    );
};

export default App;
