import { Curriculum } from "./components/Curriculum/Curriculum";
import {SearchPerson} from "./components/SearchPerson/SearchPerson"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
    return (
        <>
        <BrowserRouter basename="/src">
            <Routes>
                <Route path="/login" element={<SearchPerson></SearchPerson>}></Route>
                <Route path="/curriculum/:token" element={<Curriculum></Curriculum>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default App;