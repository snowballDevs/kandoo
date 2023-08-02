import {useContext} from 'react'
import { ModalContext } from "../contexts/ModalContext/ModalContext"
import RegisterForm from "./RegisterForm";
import LoginForm from '../components/LoginForm';
// home page or dashboard page depending on authentication status



const LandingPage = () => {
  const {handleOpen, isModalOpen} = useContext(ModalContext)

return (
    <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
            <div className='max-w-md'>
                <h1 className='text-5xl font-bold'>Projects. Together.</h1>
                <p className='py-6'>
                    Organize your team goals and deploy faster
                </p>
                <button type='button' className='btn btn-primary' data-modal="modal-register" onClick={handleOpen}>
                    Get Started
                </button>
                {isModalOpen && <RegisterForm  />}
                {/* {isModalOpen && <LoginForm  />} */}
            </div>
        </div>
    </div>

)
};
export default LandingPage;
