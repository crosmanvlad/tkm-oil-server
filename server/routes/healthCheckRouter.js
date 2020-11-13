/**
 * Health router
 *  
 */
const mongoose = require('mongoose');

module.exports = router => {

    router.get('/health-check', require('express-healthcheck')({
        healthy: () => {
            if (mongoose.connection.readyState === 1) {
                return  { state: 'healthy' };
            }
        },
        test:  () => {
            if (mongoose.connection.readyState !== 1) {
                return  { state: 'unhealthy' };
            }
        }
    }));

}