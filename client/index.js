import * as APIFunctions from "./util/api-functions.js";
window.APIFunctions = APIFunctions;
import * as UIFunctions from "./util/ui-functions.js";
window.UIFunctions = UIFunctions;
// if we are hosting we'll set our API key directly
if (process.env.NODE_ENV !== "production") {
  const SECRET_API_KEY = require("./keys.js");
  window.SECRET_API_KEY = SECRET_API_KEY;
} else {
  console.dir(process.env);
  window.SECRET_API_KEY = process.env.SECRET_API_KEY;
}
