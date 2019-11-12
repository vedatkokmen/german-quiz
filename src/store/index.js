import Vue from "vue";
import Vuex from "vuex";
import db from "./../firebase"
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		words: [],
		hints: []
	},
	mutations: {
		FETCH_DATA(state) {
			db.collection("data").get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					state.words.push(doc.data())
				})
			})
		},
		FETCH_HINTS(state) {
			db.collection("hints").get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					state.hints.push(doc.data())
				})
			})
		}
	},
	actions: {
		fetchWords(context) {
			context.commit("FETCH_DATA");
		},
		fetchHints(context) {
			context.commit("FETCH_HINTS");
		}
	},
	modules: {}
});
