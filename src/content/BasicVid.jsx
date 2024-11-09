import React from 'react';
import AnimatedVideo from '../assets/animated.mp4';
import ReactPlayer from 'react-player';

import ContentHeader from '../components/ContentHeader';
import './Content.css';

const Video = () => {
    return (
        <div className='video-wrapper'>
            <ContentHeader />
            <h2>Common Phrases</h2>
            <ReactPlayer 
                controls={true} 
                url={AnimatedVideo} 
                height="500px" 
                width="100%"
                muted={true}
                pip={true}
                stopOnUnmount={false}
                light={false}
            />
        </div>
    )
}

export default Video;
