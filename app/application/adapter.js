import JSONAPIAdapter from "ember-data/adapters/json-api";
import config from "../config/environment";

export default JSONAPIAdapter.extend({
	namespace: "api",
	host: config.host
});
