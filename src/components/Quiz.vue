<template>
	<div class="app">
		<div class="container">
			<div class="col s12">
				<div v-if="!started" class="title">
					<h1>ARTIKEL QUIZ</h1>
				</div>
			</div>
			<!-- Col end -->
			<div class="col s12">
				<div v-if="started" class="title">
					<h1>{{ paragraph }}</h1>
				</div>
			</div>
			<div class="col s12">
				<div v-show="started" class="score">
					<h3>Score: {{ score }}</h3>
					<p class="flow-text">False: {{ falsch }}</p>
				</div>
			</div>
			<div class="col s12">
				<button
					v-show="!started"
					@click="getWord"
					class="waves-effect btn-large btn-flat blue"
				>
					START
				</button>
			</div>
			<div class="col s12">
				<div v-show="started" @click="answered" id="buttons">
					<button
						data-value="der"
						class="waves-effect btn-large btn-flat blue"
						id="der"
					>
						DER
					</button>
					<button
						data-value="die"
						class="waves-effect btn-large btn-flat pink"
						id="die"
					>
						DIE
					</button>
					<button
						data-value="das"
						class="waves-effect btn-large btn-flat teal"
						id="das"
					>
						DAS
					</button>
				</div>
			</div>

			<div v-show="started" class="col s12">
				<button class="waves-effect btn-large btn-flat orange" @click="getHint">
					HINT
				</button>
				<div class="hint-block">
					<p class="flow-text" v-show="hinted">{{ hintPara }}</p>
				</div>
			</div>
		</div>
		<div class="">
			<small>Created by Vedat Kökmen</small>
		</div>
	</div>
</template>

<script>
import { setInterval } from "timers";

export default {
	data() {
		return {
			started: false,
			score: 0,
			words: this.$store.state.words,
			hints: this.$store.state.hints,
			hinted: false,
			hintObj: "null",
			hintPara: "",
			wordSource: "",
			paragraph: "",
			counterSec: 5,
			buttons: document.getElementById("buttons"),
			richtig: 0,
			falsch: 0
		};
	},
	methods: {
		getWord() {
			var random = Math.floor(Math.random() * (this.words.length - 1));
			this.started = true;
			this.wordSource = this.words[random];
			this.paragraph = this.wordSource.source;
			var interval = setInterval(() => {
				if (this.counterSec == 0) {
					clearInterval(interval);
				} else {
					this.counterSec--;
				}
			}, 1000);
		},
		answered(e) {
			if (this.wordSource.artikel === e.target.id) {
				this.score++;
				this.getWord();
				M.toast({ html: "Es ist richtig!", displayLength: 1000 });
			} else {
				this.falsch++;
				this.getWord();
				M.toast({ html: "Es ist falsch!", displayLength: 1000 });
			}
		},
		getHint() {
			let random = Math.floor(Math.random() * (this.hints.length - 1));
			this.hintObj = this.hints[random];
			console.log(this.hintObj.hint);
			this.hinted = true;
			this.hintPara = this.hintObj.hint;
		}
	},
	created() {
		this.$store.dispatch("fetchWords");
		this.$store.dispatch("fetchHints");
	}
};
</script>

<style scoped>
.app {
	background-color: #eeeeee;
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.container {
	background: #ffffff;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.container:hover {
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.btn-large {
	margin-right: 1rem;
	color: white;
	font-weight: bold;
	font-size: 1.2rem;
}

.title {
	text-transform: uppercase;
}

.col {
	margin: 4rem;
}
</style>
