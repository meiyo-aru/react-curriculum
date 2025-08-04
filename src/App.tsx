import { Curriculum } from "./components/Curriculum/Curriculum";
import {SearchPerson} from "./components/SearchPerson/SearchPerson"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchPerson></SearchPerson>}></Route>
                <Route path="/curriculum/:token" element={<Curriculum></Curriculum>}></Route>
                <Route path="/curriculum" element={<Curriculum></Curriculum>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default App;