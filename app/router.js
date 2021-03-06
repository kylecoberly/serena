import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	this.route("transportation", function(){
		this.route("bus-route", {path: ":route_id"});
	});
});

export default Router;
