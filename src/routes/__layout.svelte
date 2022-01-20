<script>
	import { page } from '$app/stores';
	import Header from '$lib/Header/index.svelte';
	import { modul, showModal, showStats } from '../stores/stores.js';
	
	import '../static/css/style.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer class="{$showModal && showStats ? 'fixed' : ''}">
	<nav>
		<ul>
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/" on:click={() => modul.set(0)}>Modul auswählen</a></li>
			<li class:active={$page.path === '/hilfe'}><a sveltekit:prefetch href="/hilfe">Hilfe</a></li>
			<li class:active={$page.path === '/ueber'}><a sveltekit:prefetch href="/ueber">Über</a></li>
		</ul>
	</nav>
</footer>

<style>
	main {
		display: flex;
		flex: 1;
		flex-direction: column;
		margin: 0 auto;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		box-sizing: border-box;
		z-index: 1;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px 0;
		background: white;
		box-shadow: 0 0 20px 40px white;
		z-index: 1;
	}
	@media (min-width: 576px) {
		footer {
			padding: 40px;
		}
	}
	footer.fixed {
		bottom: 0;
		position: fixed;
    	width: 100%;
	}
	footer ul, footer ul li {
		list-style: none;
		margin-left: 0;
	}

	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		--background: var(--almost-green);
	}

	nav ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		border-radius: 1rem;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	nav ul li {
		position: relative;
		height: 100%;
	}
	nav ul li:first-child a {
		margin-left: .5rem;
	}
	nav ul li:last-child a {
		margin-right: .5rem;
	}

	nav ul li.active::before {
		--size: 3px;
		content: '';
		width: 100%;
		height: 0;
		position: absolute;
		top: 0;
		border-top: var(--size) solid var(--accent-color);
	}

	nav ul li a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	nav ul li a:hover {
		color: var(--accent-color);
	}

</style>
