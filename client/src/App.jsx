
import './App.css'
import LandingPage from './features/LandingPage'
import Footer from "./components/Footer";
import Header from './components/Header'
import Form from './components/Form';
import KanbanBoard from './components/KanbanBoard';


const App = () => (
    <div>
       <Header/>  
       <LandingPage />

       <div className="container mx-auto mt-8 mb-16">
        <h1 className="text-2xl text-center font-bold mb-4">Form Example</h1>
        <Form />
        <KanbanBoard />
      </div>
       <Footer />
    </div>
  )
export default App;
