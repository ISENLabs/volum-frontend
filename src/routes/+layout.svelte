<script>
	import Layout from '$lib/components/layout/Layout.svelte';
	import auth from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(async () => {
		const isAuthenticated = await auth.checkAuth();
		if (!isAuthenticated) {
			window.location.href = import.meta.env.VITE_LOGIN_URL;
		}
	});
</script>

<Layout>
	<slot />
</Layout>
