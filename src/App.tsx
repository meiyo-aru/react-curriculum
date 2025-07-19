import AboutMe from "./components/AboutMe";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [about, setAboutMe] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();
                
                const response = await axios.get('https://curriculum-data-api.onrender.com/get');
                
                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Tempo total de requisições: ${result}ms`);

                if(response){
                    const data = response.data;
                    console.log(data);
                    setAboutMe(data.about);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    /*     
        const [language, setLanguage] = useState("pt");
    
        const handleLanguageChange = () => {
            setLanguage(language => language === "pt" ? "en" : "pt");
            alert('Língua mudada')
        }
    */
    return (
        <>
            <AboutMe title="Sobre mim" text={about}/>
        </>
    )
}
export default App;