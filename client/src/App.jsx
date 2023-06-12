import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import TodoPage from "./Pages/TodoPage.jsx";

function App() {

    return (
        <>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path='/todo' element={<TodoPage/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
