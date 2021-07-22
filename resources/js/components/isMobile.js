import Alpine from 'alpinejs'
import isMobile from '@utils/isMobile'


Alpine.data('isMobile', () => ({
    currentOs: null,
    init() {
        this.isMobile = isMobile()
    }
}))
