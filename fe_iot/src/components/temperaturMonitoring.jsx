import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "@ramonak/react-progress-bar";
import './card.css'; // 
import axios from 'axios';
const WebSocketComponent = ({ name }) => {
    const apiUrl = 'http://10.11.50.253:5800/tem';
    const [dataFromWS, setDataFromWS] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.log('GET response:', response.data);
                setDataFromWS(response.data)
            } catch (error) {
                console.error('GET error:', error);
            }
        };

        const intervalId = setInterval(fetchData, 1000); // Call every 5 seconds
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="card">
            <div className="card-content">
                <h2>
                    <FontAwesomeIcon icon={faTemperatureHigh} size="lg" style={{ marginRight: '10px' }} />
                    {name}
                </h2>

                <div className="monitoring-item">
                    <p>Nhiệt độ:</p>
                    <ProgressBar
                        maxCompleted={100}
                        bgColor={dataFromWS?.temperature < 30 ? '#008000' : '#FF0000'}
                        completed={dataFromWS?.temperature.toString()}
                    />
                </div>
                <div className="monitoring-item">
                    <p>Độ ẩm:</p>
                    <ProgressBar
                        maxCompleted={100}
                        bgColor={dataFromWS?.humidity < 70 ? '#008000' : '#FF0000'}
                        completed={dataFromWS?.humidity.toString()}
                    />
                </div>
            </div>
        </div>
    );
};

export default WebSocketComponent;
