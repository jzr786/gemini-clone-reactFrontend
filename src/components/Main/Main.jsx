import React, { useContext } from 'react';
import "./Main.css";
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    // Sanitize resultData before parsing
    const safeResultData = DOMPurify.sanitize(resultData);

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">
                {!showResult
                    ?
                    <>
                        <div className="greet">
                            <p><span>Hello, Juzer</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly Summarize the concept, Urban Planning!</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p>{parse(safeResultData)}</p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Ask Gemini' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini apps
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Main;
