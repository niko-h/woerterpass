<script>
	import { page } from '$app/stores';
	import { modul, level, showStats, wortScore, wortProgress, showModal } from '../../stores/stores.js';
</script>

<header class="container p-12 p-lg-5">
	<div class="row">
		<div class="col topbar py-2 px-2">
			<h1 class="ml-1 brand">Wörterpass<super>&nbsp;beta</super></h1>

			{#if ['/', '/hilfe', '/ueber', '/fuerLehrerInnen'].indexOf($page.path) < 0 }
				<div class="stats">
					<button class="stat mr-1 py-1 px-2" on:click={() => {showModal.set(true);showStats.set(true);}}>
						<div class="inline-block px-1">
							<span class="prop">Wörter</span>
							<div class="val">
								{$wortProgress} <span class="small">{$wortScore}</span>
							</div>
						</div>
					</button>
					<button class="stat mr-1 py-1 px-2 moduleBg-{$modul}" on:click={() => {showModal.set(true);showStats.set(true);}}>
						<div class="inline-block px-1">
							<span class="prop">Modul</span>
							<div class="val">
								{$modul} <span class="small">{$level}</span>
							</div>
						</div>
					</button>
				</div>
			{/if}
		</div>
	</div>
</header>

<style>
	.stats .stat {
		outline: none;
		border: none;
	}
	.stats .stat .val {
		font-size: 2rem;
		display: block;
		line-height: 1;
		font-family: 'Patrick', sans-serif;
		z-index: 1;
		position: relative;
		height: 1em;
		overflow: hidden;
	}
	span.small {
		font-size: 1.2rem;
	}
	h1 super {
		font-size: .7rem;
    	position: absolute;
		top: 0;
	}
</style>
