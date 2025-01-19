<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getVM, startVM, stopVM, deleteVM } from '$lib/api/vm';
	import VMStats from '$lib/components/vm/VMStats.svelte';
	import VMControls from '$lib/components/vm/VMControls.svelte';
	import { goto } from '$app/navigation';

	const vmId = $page.params.id;
	let vm = null;
	let loading = true;
	let error = null;
	let deleting = false;

	onMount(async () => {
		try {
			const response = await getVM(vmId);
			if(response.data.length > 0)
				vm = response.data[0];
			loading = false;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	async function handleStart() {
		try {
			await startVM(vmId);
			const response = await getVM(vmId);
			vm = response.data;
		} catch (err) {
			error = err.message;
		}
	}

	async function handleStop() {
		try {
			await stopVM(vmId);
			const response = await getVM(vmId);
			vm = response.data;
		} catch (err) {
			error = err.message;
		}
	}

	async function handleDelete() {
		if (!confirm('Êtes-vous sûr de vouloir supprimer cette VM ? Cette action est irréversible.')) {
			return;
		}

		try {
			deleting = true;
			await deleteVM(vmId);
			goto('/');
		} catch (err) {
			error = err.message;
			deleting = false;
		}
	}
</script>

<div>
	{#if loading}
		<div class="text-center py-12">
			<p class="text-gray-500">Chargement...</p>
		</div>
	{:else if error}
		<div class="bg-red-50 border border-red-200 rounded-md p-4">
			<p class="text-sm text-red-600">{error}</p>
		</div>
	{:else if vm}
		<div class="space-y-6">
			<!-- Header -->
			<div class="bg-white shadow rounded-lg p-6">
				<div class="flex justify-between items-start">
					<div>
						<h1 class="text-2xl font-semibold text-gray-900">{vm.name}</h1>
						<p class="mt-1 text-sm text-gray-500">
							{vm.subdomain}
						</p>
					</div>
					<span
						class={`px-3 py-1 text-sm rounded-full ${
							vm.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
						}`}
					>
						{vm.status}
					</span>
				</div>
			</div>

			<!-- Stats -->
			<VMStats {vm} />

			<!-- Controls -->
			<VMControls
				{vm}
				{deleting}
				on:start={handleStart}
				on:stop={handleStop}
				on:delete={handleDelete}
			/>
		</div>
	{:else}
		<div class="text-center py-12 bg-white rounded-lg shadow">
			<h3 class="text-sm font-medium text-gray-900">VM introuvable</h3>
			<div class="mt-6">
				<a
					href="/"
					class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
				>
					Retour à l'accueil
				</a>
			</div>
		</div>
	{/if}
</div>
