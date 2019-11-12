<template>
	<div class="container mx-auto">
		<a
			class="waves-effect waves-light btn modal-trigger"
			href="#modal1"
			@click="modalOpen = !modalOpen"
		>New Word</a>
		<div id="modal1" v-show="modalOpen === true" class="row">
			<form @submit.prevent="addItem" class="col s6">
				<div class="row"></div>
				<div class="row">
					<div class="input-field col s6">
						<textarea v-model="newWord.source" class="materialize-textarea" data-length="30"></textarea>
						<label for="textarea2">Word</label>
					</div>
				</div>
				<a class="waves-effect waves-light btn modal-trigger" href="#modal1" @click="addWord">Add Word</a>
			</form>
		</div>
	</div>
</template>

<script>
import db from "../firebase";
export default {
	data() {
		return {
			newWord: {
				source: "",
				artikel: ""
			},
			words: this.$store.state.words,
			modalOpen: false
		};
	},
	methods: {
		/* IT'S WORKING
		addWord() {
			db.collection("data")
				.add(this.newWord)
				.then(function(docRef) {
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
		} */
	}
};
</script>

<style scoped>
</style>