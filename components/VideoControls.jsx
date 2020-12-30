import React, { useRef } from 'react';

import { metadata } from '../metadata.json';

const { duration } = metadata;

export default function VideoControls({ timeStamp, setTimeStamp, isPlaying, setPlayingStatus }) {
    const progress_bar_container = useRef(null);
    const progress_bar_click_seeker = (event) => {
        const {left, right} = progress_bar_container.current.getBoundingClientRect();
        const mouse_click_location_x_co_ordinate = event.clientX;
        const intended_seek_point = ((mouse_click_location_x_co_ordinate - left) * duration) / (right - left );
        setTimeStamp(intended_seek_point);
    }
    return (
        <div>
            <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200"
                    ref={progress_bar_container}
                    onClick={progress_bar_click_seeker}>
                    <div style={{ width: `${(timeStamp * 100) / duration}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                        ></div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setTimeStamp(0)}>
                    Start
                </button>
                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setTimeStamp(timeStamp - 10)}>
                    - 10 Seconds
                </button>
                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPlayingStatus(!isPlaying)}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setTimeStamp(timeStamp + 10)}>
                    + 10 Seconds
                </button>
                <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setTimeStamp(duration)}>
                    End
                </button>
            </div>
        </div>
    )
}
