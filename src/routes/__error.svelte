<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, redirect, status, error }) {
		const validSlug = page.path.match(/^\/[0-9]-?[a-g]$/i) !== null;
        const newURL = `/${page.path.charAt(1)}${page.path.charAt(3).toUpperCase()}`;

		if (validSlug) {
			return {
            	status: 301,
				redirect: newURL
			};
		} 
		else {
			return {
				status: 301,
				redirect: '/'
			};
		}
	}
</script>

<script>
	export let status;
	// export let error;

	let online = typeof navigator !== 'undefined'
		? navigator.onLine
		: true;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="mt-5">
	{#if online}
		<h1>Ups! Ein Fehler {status} ist aufgetreten</h1>

		{#if status === 404}
            <h4>Die gesuchte Seite gibt es nicht. Zurück zur <a href="/">Startseite</a></h4>
        {/if}

        {#if status >= 500}
            <h3>Bitte versuche die Seite erneut zu laden.<br/>
            Wenn der Fehler bestehen bleibt, versuche es bitte später nochmal.</h3>
        {/if}
	{:else}
		<h1>Es sieht so aus als wärst du offline</h1>
		<h3>Lade die Seite erneut, sobald du das Internet gefunden hast.</h3>
	{/if}

	<!-- <p class="error">{error.stack}</p>
	<p class="error">{error.message}</p> -->

</div>

<style>
	.error {
		background-color: #da106e;
		color: white;
		padding: 12px 16px;
		border-radius: 3px;
        width: max-content;
		max-width: 100%;
	}
</style>