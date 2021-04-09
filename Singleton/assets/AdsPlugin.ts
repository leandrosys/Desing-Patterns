import Singleton from './Singleton'
import { Ad } from './Ads'

export default class AdsPlugin {
    private ad:Singleton;
    private videoElement:HTMLMediaElement;
    private currentAd:Ad
    adsContainer:HTMLElement

    constructor(videoElement:HTMLMediaElement) {
        this.ad = Singleton.getInstance()
        this.videoElement = videoElement
    }

    handleAds() {
        const currentTime = Math.floor(this.videoElement.currentTime)
        if(currentTime % 30 === 0 && currentTime != 0){
            this.renderAd()
        }
    }
    private renderAd(){
        if(this.currentAd) {
            return;
        }
        const ad = this.ad.getAd()
        this.currentAd = ad

        this.adsContainer = document.querySelector('#adsContainer')
        this.adsContainer.className='ads'
        this.adsContainer.innerHTML = `
        <img src="${this.currentAd.imageUrl}" alt="">
        <div class="infoAds">
            <span>${this.currentAd.title}</span>
            <span>${this.currentAd.body}</span>
        </div>`;

        setTimeout(() => {
            this.currentAd = null
            this.adsContainer.classList.remove("ads")
            this.adsContainer.innerHTML = ''
        }, 10000);
    }
}

