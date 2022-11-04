// https://github.com/capacitor-community/admob
import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob'
import { Device } from '@capacitor/device'

const androidAdId = 'ca-app-pub-8080343904271029~4328877889'
const iosAdId = 'ca-app-pub-8080343904271029~8235537145'
let bannerAdId = androidAdId

export default {
    async AdMob_init() {
        const { status } = await AdMob.trackingAuthorizationStatus()
        if (status === 'notDetermined') {
            /**
             * If you want to explain TrackingAuthorization before showing the iOS dialog,
             * you can show the modal here.
             * ex)
             * const modal = await this.modalCtrl.create({
             *   component: RequestTrackingPage,
             * });
             * await modal.present();
             * await modal.onDidDismiss();  // Wait for close modal
             **/
        }

        AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
            initializeForTesting: true,
        }).then().catch()
    },
    async AdMob_banner() {
        AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
            // Subscribe Banner Event Listener
        })

        AdMob.addListener(BannerAdPluginEvents.SizeChanged, (AdMobBannerSize) => {
            // Subscribe Change Banner Size
            console.log('STICKY: AdMobBannerSize', AdMobBannerSize)
        })

        const device = await Device.getInfo()
        if(device.platform === 'ios') {
            bannerAdId = iosAdId
        }
        const BannerAdOptions = {
            adId: bannerAdId,
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
            // isTesting: true
            // npa: true
        }
        await AdMob.showBanner(BannerAdOptions)
    }
}
