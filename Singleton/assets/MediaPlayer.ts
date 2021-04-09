class MediaPlayer {
    videoElement:HTMLMediaElement
    constructor(videoElement:HTMLMediaElement){
        this.videoElement = videoElement;
    }
    togglePlay() {
        this.videoElement.paused ? this.videoElement.play() : this.videoElement.pause()
    }

    toggleMuted() {
        this.videoElement.muted ? this.videoElement.muted = false : this.videoElement.muted = true
    }
    toggleVisibility() {
        if(document.visibilityState === 'hidden' && !this.videoElement.muted){
            this.toggleMuted()
        } else if (document.visibilityState === 'visible' && this.videoElement.muted) {
            this.toggleMuted()
        }
    }
}

export default MediaPlayer;
