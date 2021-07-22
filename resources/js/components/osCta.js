import Alpine from 'alpinejs'
import getOs from '@utils/getOs'
import isMobile from '@utils/isMobile'


Alpine.data('osCta', () => ({
    currentOs: null,
    init() {
        this.currentOs = getOs()
        this.isMobile = isMobile;
        console.log(this.isMobile);
    }
}))