import MediaPlayer from './MediaPlayer'
import AdsPlugin from './AdsPlugin'

const playButton:HTMLElement = document.getElementById('playButton');
const videoElement:HTMLMediaElement = document.querySelector('video');
const mutedButton:HTMLElement = document.getElementById('mutedButton');

const plugin:MediaPlayer = new MediaPlayer(videoElement)
const ads:AdsPlugin = new AdsPlugin(videoElement)

playButton.addEventListener('click', plugin.togglePlay.bind(plugin), false)
mutedButton.addEventListener('click', plugin.toggleMuted.bind(plugin), false)

document.addEventListener('visibilitychange', plugin.toggleVisibility.bind(plugin))

videoElement.addEventListener('timeupdate', ads.handleAds.bind(ads), true)