import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, newWord) => {
        setTimeout(() => {
            setResultData(prev => prev + newWord)
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response = "";
        try {

            if (prompt !== undefined) {
                response = await run(prompt);
                setRecentPrompt(prompt);
            } else {
                setPrevPrompts(prev => [...prev, input]);
                setRecentPrompt(input);
                response = await run(input);
            }

            if (!response) {
                console.error("No response received from API.");
                return;
            }

            console.log("Response received:", response);
        } catch (error) {
            console.error("Error processing prompt:", error);

            // Display error message in UI (Optional)
            setRecentPrompt("⚠️ Failed to fetch response. Try again later.");
        }

        let responseArray = response.split("**");
        let newResponse = responseArray
            .map((text, index) => (index % 2 === 0 ? text : `<b>${text}</b>`))
            .join("");

        let newResponse2 = newResponse.split("*").join("</br>")

        let newResponseArray = newResponse2.split(" ");
        newResponseArray.map((newWord, i) => {
            delayPara(i, newWord + " ");
        });

        setLoading(false)
        setInput("")
    }



    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider