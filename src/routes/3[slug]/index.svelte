<script>
	export const prerender = true;
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { modul, level, wortScore, wortProgress, showModal, showStats, stats } from '../../stores/stores.js';
	import * as data from '$lib/data-live.js';
	import Modal from '$lib/Modal/index.svelte';
	
	// on reload determine module and level from slug
	let slug;
	let audio;
	if(typeof Audio != "undefined") {
        audio = new Audio();
    }
	page.subscribe(value => slug = value.params.slug);
	modul.set(3); // hard-coded modul
	level.set(slug.toUpperCase());
	wortScore.set(0);
	wortProgress.set(0);
	
	let currentWord;
	function getWordList() {
		const stage = `${$modul}${$level}`.toLowerCase();
		const activeLists = data.modules[stage];
		const current_list_id = Math.floor(Math.random() * activeLists.length);
		return data[activeLists[current_list_id]];
	}
	function getCurrentWord() {
		const currentList = getWordList();
		const currentWordId = Math.floor(Math.random() * currentList.length)+1;
		currentWord = currentList.filter(w => w.id === currentWordId)[0];
		playAudio('assets/words/audio/', currentWord.wort);
	}
	getCurrentWord();
	
	let task = {};
	function resetTask() {
		task.message = 'Hier gibt es nichts zu sehen.';
		task.steps = [
			{
				silbenboegen: false
			},
			{
				fabrik: false
			}
		];
		task.state = 'undefined';
		task.step = 0;
	}
	resetTask();
	
	let inputs = {};
	function resetInputs() {
		inputs.silbenboegen = [];
		inputs.fabrik = [];
	}
	resetInputs();

	stats.set([
		{
			handle: 'silbenboegen',
			score: 0,
			progress: 0
		},
		{
			handle: 'fabrik',
			score: 0,
			progress: 0
		}
	]);

	function addInput(key, input) {
		if(inputs[key].length < 5) inputs[key] = inputs[key].concat(input);
		if(task.state === 'again') task.state = 'edited';
	}

	function popInput(key) {
		inputs[key].pop();
		inputs[key] = inputs[key];
		if(task.state === 'again') task.state = 'edited';
	}

	function checkInput(key) {
		if(JSON.stringify(inputs[key]).replace(/[\[\]'"]+/g,'') === JSON.stringify(currentWord[key]).replace(/[\[\]'"]+/g,'')) {
			return true;
		}
		return false;
	}

	function validate() {
		for(const key in task.steps[task.step]) {
			let stat = $stats.find(stat => stat.handle === key);
			task.steps[task.step][key] = checkInput(key);
			if(task.steps[task.step][key]) {
				stat.score += 1;
			}
			stat.progress += 1;
		};

		if(Object.values(task.steps[task.step]).every(item => item)) {
			task.message = 'Richtig!';
			task.sub = 'Weiter so.';
			task.state = 'correct';
			setTimeout(() => {
                nextStep();
            }, 3000);
		} else if(task.state === 'undefined') {
			task.message = 'Ups';
			task.sub = 'Da war etwas falsch.';
			task.state = 'again';
		} else if(task.steps.length > task.step+1) {
			task.message = 'Das war nicht ganz richtig';
			task.sub = 'Beim nächsten mal.';
			task.state = 'next';
		} else {
			task.message = 'Nicht ganz richtig';
			task.sub = 'Viel Erfolg beim nächsten Wort!';
			task.state = 'next';
		}
		showModal.set(true);
	}

	function nextStep() {
		if(task.steps.length === task.step+1 && (task.state === 'correct' || task.state === 'next')) {
			if(task.steps.every(step => Object.values(step).every(item => item))) {
				wortScore.set($wortScore + 1);
			}
			resetTask();
			resetInputs();
			getCurrentWord();
			wortProgress.set($wortProgress + 1);
		} else if(task.state === 'correct' || task.state === 'next') {
			task.state = 'undefined';
			task.step += 1;
		}
		showModal.set(false);
		showStats.set(false);
	}

	function playAudio(path, filename) {
		if(typeof Audio != "undefined") {
			var playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.catch(error => {}).then(() => {});
			}
			if (audio.canPlayType('audio/mpeg')) {
				audio.src = `${path}mp3/${filename}.mp3`;
			}
			if (audio.canPlayType('audio/aac')) {
				audio.src = `${path}aac/${filename}.m4a`;
			}
			if (audio.canPlayType('audio/ogg')) {
				audio.src = `${path}ogg/${filename}.ogg`;
			}
			audio.play();
		}
	}

	function inputFabrik(e, fabrik) {
		popInput('fabrik');
		addInput('fabrik', fabrik);

		// ugly fix: focus onClick for iOS
		if(fabrik === "2" || fabrik === "23") {
			e.target.parentNode.focus();
		} else if (fabrik === "12") {
			e.target.parentNode.parentNode.focus();
		} else {
			e.target.parentNode.parentNode.parentNode.focus();
		}
	}
</script>

{#if task.step === 0 && ((!$showModal || $showStats) || (!checkInput('silbenboegen') && (task.state === 'again' || task.state === 'edited'))) }
	<section class="row mt-6" transition:fade>
		<div class="form col col-12 col-lg-6 m-auto py-4 px-3">
			<div class="word row">
				<div class="col text-align-center">
					<button title="Wort anhören" on:click={() => playAudio('assets/words/audio/', currentWord.wort)} class="a word__img inline-block">
						<img src={`assets/words/img/${currentWord.wort.toLowerCase()}.jpg`} alt="{currentWord.wort}">
						<div class="icon-headphones"></div>
					</button>
				</div>
			</div>

			<div class="input__container my-3">
				<h3 class="ml-3 mb-0">Silbenbögen</h3>
				<div class="row">
					<div class="col col-11 col-lg-8 pr-0">
						<button class="btn btn-secondary btn-icon-round icon-eraser eraseBtn" title="Silbenbogen löschen" on:click={() => (popInput('silbenboegen'))}></button>
						<div class="input__canvas p-2 my-2 {task.state === 'again' ? 'alert' : ''}">
							{#each inputs['silbenboegen'] as bogen}
								<i class={`icon-large icon-bogen-${bogen}`} />
							{/each}
						</div>
					</div>
					<div class="col v-center">
						<button class="btn btn-lg btn-light v-center mr-1" disabled={inputs['silbenboegen'].length >=5 ? 'disabled' : ''} on:click={() => (addInput('silbenboegen', 'g'))} title="großer Bogen = betonte (laute) Silbe"><i class="icon-bogen-g icon-large"></i> </button>
						<button class="btn btn-lg btn-light v-center" disabled={inputs['silbenboegen'].length >=5 ? 'disabled' : ''} on:click={() => (addInput('silbenboegen', 'k'))} title="kleiner Bogen = unbetonte (leise) Silbe"><i class="icon-bogen-k icon-large"></i> </button>
					</div>
				</div>
			</div>

			<div class="row mt-5 mb-1">
				<div class="col">
					<button class="btn btn-primary float-right" disabled={inputs['silbenboegen'].length < 1} on:click={() => validate()} title="Kontrollieren"><i class="icon-arrow-right icon-large"></i></button>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if task.step === 1 && ((!$showModal || $showStats) || (task.state === 'again' || task.state === 'edited'))}
	<section class="row mt-6" transition:fade>
		<div class="form col col-12 col-lg-6 m-auto py-4 px-3">
			<div class="word row">
				<div class="col text-align-center">
					<button title="Wort anhören" on:click={() => playAudio('assets/words/audio/', currentWord.wort)} class="a word__img inline-block">
						<img src={`assets/words/img/${currentWord.wort.toLowerCase()}.jpg`} alt="word">
						<div class="icon-headphones"></div>
					</button>
				</div>
			</div>

			<div class="input__container my-3">
				<h3 class="ml-3">Fabrik</h3>
				<div class="row">
					<div class="col h-center v-center flex-wrap p-0">
						{#if ['B'].indexOf($level) < 0}
							<button class="btn btn-lg btn-light v-center m-2" on:click={(e) => {inputFabrik(e, '2')}} title="Das Wort hat nur eine Silbe, z.B. &quot;Hund&quot;."><i class="icon-rhythmus-2 icon-xlarge"></i> </button>
						{/if}
							<button class="btn btn-lg btn-light v-center m-2" on:click={(e) => {inputFabrik(e, '23')}} title="Bei dem Wort wird die letzte Silbe betont (laut) gesprochen, z.B. &quot;paKET&quot;."><i class="icon-rhythmus-12 icon-xlarge"></i> </button>
						{#if ['A'].indexOf($level) < 0}
							<button class="btn btn-lg btn-light v-center m-2" on:click={(e) => {inputFabrik(e, '12')}} title="Das Wort hat zwei Silben, die betonte (laute) Silbe ist am Anfang, z.B. &quot;AUto&quot;."><span class="icon-rhythmus-23 icon-xlarge"><span class="path1"></span><span class="path2"></span></span> </button>
						{/if}
						{#if ['A','B'].indexOf($level) < 0}
							<button class="btn btn-lg btn-light v-center m-2" on:click={(e) => {inputFabrik(e, '123')}} title="Bei dem Wort wird die vorletzte Silbe betont (laut) gesprochen, z.B. &quot;heliKOPter&quot;."><span class="icon-rhythmus-123 icon-xlarge"><span class="path1"></span><span class="path2"><span class="path3"></span></span> </button>
						{/if}
					</div>
				</div>
			</div>

			<div class="row mt-5 mb-1">
				<div class="col">
					<button class="btn btn-primary float-right" disabled={inputs['fabrik'].length < 1} on:click={() => validate()} title="Kontrollieren"><i class="icon-arrow-right icon-large"></i></button>
				</div>
			</div>
		</div>
	</section>
{/if}

<Modal {...task} {nextStep} />

<style>
	.input__container i {
		width: 40px;
	}
	.input__canvas > i {
		width: 34px;
		font-size: 50px;
	}
	.flex-wrap {
		flex-wrap: wrap;
	}
</style>