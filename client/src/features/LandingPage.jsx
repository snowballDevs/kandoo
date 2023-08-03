import Header from '../components/Header';
// home page or dashboard page depending on authentication status
const LandingPage = () => (
    <div>
        <Header />
        <div className='hero min-h-screen bg-base-200'>
            <div className='hero-content text-center'>
                <div className='max-w-md'>
                    <h1 className='text-5xl font-bold'>Projects. Together.</h1>
                    <p className='py-6'>
                        Organize your team goals and deploy faster
                    </p>
                    <button type='button' className='btn btn-primary'>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </div>
);
export default LandingPage;
