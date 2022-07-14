import { useState, useEffect } from "react"
import { getData } from "../utils/GetData";

export const useFetchHook = () => {
    const [state, setState] = useState({
        articles: [],
        loading: true
    });

    useEffect(() => {
        getData()
        .then( articles => {            
            setState({
                articles
            })           
        });
    }, []);

    return state; //{ data: [], loading: true }
}