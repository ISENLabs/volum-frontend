<script>
	export let vm;
	export let is_admin = false;
	export let this_user_id = 0;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="bg-white shadow rounded-lg p-6">
	<div class="flex items-center justify-between">
		<div>
			<h3 class="text-lg font-medium text-gray-900">
				{#if is_admin && vm.owner_id == this_user_id}
					<u>{vm.name}</u>
				{:else}
					{vm.name}
				{/if}
			</h3>
			{#if is_admin}
				<span>User id: {vm.owner_id}</span>
			{/if}

			<span>Propriétaire: {vm.name} | {vm.class_name}</span>
		</div>
		<span
			class={`px-2 py-1 text-sm rounded-full ${vm.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
		>
			{vm.status}
		</span>
	</div>

	<div class="mt-4 grid grid-cols-2 gap-4">
		<div>
			<p class="text-sm text-gray-500">Sous-domaine</p>
			<p class="text-sm font-medium text-gray-900">{vm.subdomain}
				<button 
					on:click={() => window.open(`https://${vm.subdomain}.${import.meta.env.VITE_VOLUM_DOMAIN}`, '_blank')}
					class="ml-2 text-gray-500 hover:text-gray-700"
					title="Ouvrir dans un nouvel onglet"
					aria-label="Ouvrir dans un nouvel onglet"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
						<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
						<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
					</svg>
				</button>
			</p>
		</div>
		<div>
			<p class="text-sm text-gray-500">IP interne</p>
			<p class="text-sm font-medium text-gray-900">{vm.ip_address}</p>
		</div>
	</div>

	<div class="mt-6">
		<a
			href="/vm/{vm.vmid}"
			class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
		>
			Gérer
		</a>
	</div>
</div>
