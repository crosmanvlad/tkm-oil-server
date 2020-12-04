const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("basic")
    .createOwn("collection")
    .readOwn("collection")

  ac.grant("admin")
    .extend("basic")
    .readAny("collection")
    .updateAny("collection")
    .deleteAny("collection")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")

  return ac;
})();
