import AboutMe from "./components/AboutMe/AboutMe";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card/Card";
import React from "react";

interface Person {
  name: string
  positions: string
  about: string
  address: string
  phone_01: string
  phone_02: string
  mail: string
  linkedin: string
  id: number
}

/*   switch (type) {
    case 'tag': 
      if (title) {
        return (
          <div className={styles.smCard}>
            <h5>{title}</h5>
          </div>
        )
      } else setLoading(true);
      break;

    case 'listItem':
      if(content){
        return (
          <div className={styles.listItem}>
            {content}
          </div>
        )
      } else setLoading(true);
      break;

    default:
      console.log('default')
      if(content){
        return (
          <div className={styles.card}>
            {title && <h2>{title}</h2>}
            {content}
          </div>
        );
      } else setLoading(true);
  }  */
function App() {
    const [people, setPeople] = useState<Person | null>(null);
    const [loadingPeople, setLoadingPeople] = React.useState<boolean>(true);

    const handleLoadingPeople = (loading: boolean) => {
        setLoadingPeople(loading);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const startTimeStamp: number = Date.now();
                
                const response = await axios.get('https://curriculum-data-api.onrender.com/get/people');
                
                const endTimeStamp: number = Date.now();

                const result: number = endTimeStamp - startTimeStamp;
                console.log(`Tempo total de requisição people: ${result}ms`);

                if(response){
                    setPeople(response.data);
                    handleLoadingPeople(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    

    return (
        <>
          <AboutMe text={people ? people.about : null} isLoading={loadingPeople}/>

        </>
    )
}
export default App;