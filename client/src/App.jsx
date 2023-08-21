import './App.css';
import {useState} from 'react';
import { ToastContainer, toast} from 'react-toastify';
import {useAuthContext} from './contexts/AuthContext/authContext';
import {useRoutingContext} from './contexts/RoutingContext/routingContext';
import LandingPage from './features/LandingPage';
import Dashboard from './features/Dashboard';
import Workspace from './features/Workspace';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const {isAuthenticated} = useAuthContext();
    const {currentPage} = useRoutingContext();
    // const [clickedCardId, setClickedCardId] = useState(null); // State for card ID

    return (
        <div className='bg-primaryLight min-h-screen'>
          {/* Toast Container should be stated once in App root */}
          <ToastContainer  /> 


            {/* {isAuthenticated ? <Dashboard /> : <LandingPage />} */}

            {currentPage === 'landingPage' && <LandingPage />}
            {currentPage === 'dashboard' && (
                <Dashboard/>)}
            {currentPage === 'workspace' && <Workspace />}

           
            {/* <div className='container mx-auto mt-8 mb-16'>
                <h1 className='text-2xl text-center font-bold mb-4'>
                    Form Example
                </h1>
                <Form />
            </div> */}

            {/* {currentPage === 'landingPage' && <LandingPage />}
            {currentPage === 'dashboard' && (
                <Dashboard
                    // clickedCardId={clickedCardId}
                    // setClickedCardId={setClickedCardId}
                /> */}
            {/* )} */}
            {/* {currentPage === 'kanbanBoard' && <KanbanBoard />} */}
            {/* <div className='container mx-auto mt-8 mb-16'>
                <h1 className='text-2xl text-center font-bold mb-4'>
                    Form Example
                </h1>
                <Form />
            </div> */}

            {/* {currentPage === 'landingPage' && <LandingPage />}
            {currentPage === 'dashboard' && (
                <Dashboard
                    // clickedCardId={clickedCardId}
                    // setClickedCardId={setClickedCardId}
                /> */}
            {/* )} */}
            {/* {currentPage === 'kanbanBoard' && <KanbanBoard />} */}
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
