import { useSelector } from "react-redux";
import Card from "./components/Card/Card";
import { Curriculum } from "./components/Curriculum/Curriculum";
import {SearchPerson} from "./components/SearchPerson/SearchPerson"
import type { RootState } from "./store";

function App() {
    const dataApiURL = "http://localhost:8000"

    const personId = useSelector((state: RootState) => state.Person.personId)

    return (
        personId ?
                <Curriculum apiURL={dataApiURL}></Curriculum>
            :
                <Card title="React Curriculum Render" style={{padding: "20px 20px"}} boxShadow content={
                    <SearchPerson apiURL={dataApiURL}></SearchPerson>
                }></Card>
    )
}
export default App;