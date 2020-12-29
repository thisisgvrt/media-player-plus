import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
    ref = player => {
        this.player = player
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const { timeStamp } = this.props
        if (Math.abs(nextProps.timeStamp - timeStamp) > 2) {
            this.player.seekTo(nextProps.timeStamp, 'seconds');
        };
    }

    render() {
        const { timeStamp, setTimeStamp, isPlaying, setPlayingStatus } = this.props;
        return (
            <div className="flex flex-col">
                <ReactPlayer
                    ref={this.ref}
                    playing
                    url={[
                        { src: '/Video.mp4', type: 'video/mp4' },
                    ]}
                    width='100%'
                    height='100%'
                    playing={isPlaying}
                    onProgress={({ playedSeconds }) => setTimeStamp(playedSeconds)}
                />
            </div>
        )
    }
}

export default VideoPlayer;