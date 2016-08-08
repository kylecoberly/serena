import Ember from "ember";

export default Ember.Route.extend({
	model(parameters){
		return this.store.findRecord("train", parameters.route_id);
	}
});
