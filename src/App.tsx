import Card from "./components/card";
import Content from "./components/AboutMe";
import { useState } from "react";

function App() {
    const [language, setLanguage] = useState("pt");
  
    const handleLanguageChange = () => {
        setLanguage(language => language === "pt" ? "en" : "pt");
        alert('Língua mudada')
    }

    return (
        <>
            <Card title="Teste" content={<Content />}/>
            <button type="button" onClick={handleLanguageChange}></button>
        </>
    )
}
export default App;