<script>
	import Layout from '$lib/components/layout/Layout.svelte';
	import auth from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { getLoginUrl } from '$lib/api/login';
	import '../app.css';

	onMount(async () => {
		const isAuthenticated = await auth.checkAuth();
		if (!isAuthenticated) {
			window.location.href = getLoginUrl();
		}
	});
</script>

<Layout>
	<slot />
</Layout>
