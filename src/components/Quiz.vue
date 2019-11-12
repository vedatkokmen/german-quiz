<template>
	<div>
		<div class="container">
			<div class="col s12">
				<div v-if="!started" class="title">
					<h1>ARTIKEL QUIZ</h1>
				</div>
			</div>
			<!-- Col end -->
			<div class="col s12">
				<div v-if="started === true" class="title">
					<h1>{{ paragraf }}</h1>
				</div>
			</div>
			<div class="col s12">
				<div v-show="started === true" class="score">
					<h3>Gesamtpunktzahl: {{ score }}</h3>
					<p class="flow-text">Falsch: {{ falsch }}</p>
				</div>
			</div>
			<div class="col s12">
				<button
					v-show="started === false"
					@click="getWord"
					class="waves-effect waves-yellow btn-large btn-flat blue"
				>START</button>
			</div>
			<div class="col s12">
				<div v-show="started === true" @click="answered" id="buttons">
					<button data-value="der" class="waves-effect waves-yellow btn-large btn-flat blue" id="der">DER</button>
					<button data-value="die" class="waves-effect waves-yellow btn-large btn-flat pink" id="die">DIE</button>
					<button data-value="das" class="waves-effect waves-yellow btn-large btn-flat teal" id="das">DAS</button>
				</div>
			</div>

			<div v-show="started === true" class="col s12">
				<button class="waves-effect waves-yellow btn-large btn-flat orange" @click="getHint">HINT</button>
				<div class="hint-block">
					<p class="flow-text" v-show="hinted === true">{{ hintPara }}</p>
				</div>
			</div>
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
			paragraf: "",
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
			this.paragraf = this.wordSource.source;
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
				this.getWord();
				this.falsch++;
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
.btn-large {
	margin-right: 1rem;
	color: white;
	font-weight: bold;
	font-size: 1.2rem;
}
.btn-large:hover {
	opacity: 90%;
}
.title {
	text-transform: uppercase;
}

.col {
	margin: 4rem;
}
</style>
