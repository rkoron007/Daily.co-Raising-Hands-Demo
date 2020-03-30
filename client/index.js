import * as APIFunctions from "./util/api-functions.js";
window.APIFunctions = APIFunctions;
import * as UIFunctions from "./util/ui-functions.js";
window.UIFunctions = UIFunctions;

// if we are hosting we'll set our API key directly
if (process.env.NODE_ENV !== "production") {
  const APIKEY = require("./keys.js");
  window.APIKEY = APIKEY;
} else {
  console.log(process.env["APIKEY"]);
  console.log(process.env);
}
