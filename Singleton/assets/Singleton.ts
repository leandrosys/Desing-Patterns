import { Ad, ALL_ADS } from './Ads'

export default class SingletonAds {
    private static instance:SingletonAds;
    ads:Ad[] = [];
    private constructor() { }

    public static getInstance(): SingletonAds {
        if (!SingletonAds.instance){
            return SingletonAds.instance = new SingletonAds();
        }

        return SingletonAds.instance;
    }

    private initAds() {
        this.ads = [...ALL_ADS]
    }

    getAd() {
        if(this.ads.length === 0){
            this.initAds()
        }

        return this.ads.pop()
    }

}


