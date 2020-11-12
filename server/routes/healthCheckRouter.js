/**
 * Health router
 *  
 */

const { security } = require('./handlers/securityHandler');
const mongoose = require('mongoose');

module.exports = router => {

    router.get('/health-check', security, require('express-healthcheck')({
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