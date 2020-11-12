/**
 * Extract IP from request
 * @param {object} req 
 */
function extractClientIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || null;
}

module.exports = {
    extractClientIp
};