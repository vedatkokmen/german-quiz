<template>
	<div id="app">
		<Quiz />
		<router-view />
	</div>
</template>

<script>
import Quiz from "./components/Quiz";
export default {
	components: { Quiz }
};
</script>

<style>
* {
	font-family: "Roboto Condensed", sans-serif;
}
#app {
	font-family: "Roboto", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
