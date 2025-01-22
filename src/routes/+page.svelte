<script>
	import { onMount } from 'svelte';
	import { getVMs } from '$lib/api/vm';
	import VMCard from '$lib/components/vm/VMCard.svelte';
	import CreateVMModal from '$lib/components/vm/CreateVMModal.svelte';
	import { auth } from '$lib/stores/auth';

	let vms = [];
	let loading = true;
	let error = null;
	let showCreateModal = false;

	onMount(async () => {
		try {
			const response = await getVMs();
			vms = response.data.sort((a, b) => {
            	return parseInt(a.owner_id) - parseInt(b.owner_id);
        	});
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	function handleVMCreated() {
		showCreateModal = false;
		// Reload vm list
		onMount();
	}
</script>

<div>
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-semibold text-gray-900">Mes machines virtuelles</h1>

		{#if $auth.user.is_admin || !$auth.user.is_admin && vms.length === 0}
			<button
				on:click={() => (showCreateModal = true)}
				class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
			>
				Créer une VM
			</button>
		{/if}
	</div>

	{#if loading}
		<div class="text-center py-12">
			<p class="text-gray-500">Chargement...</p>
		</div>
	{:else if error}
		<div class="bg-red-50 border border-red-200 rounded-md p-4">
			<p class="text-sm text-red-600">{error}</p>
		</div>
	{:else if vms.length === 0} <!-- If there are no VMs -->
		<div class="text-center py-12 bg-white rounded-lg shadow">
			<h3 class="mt-2 text-sm font-medium text-gray-900">Aucune VM</h3>
			<p class="mt-1 text-sm text-gray-500">Vous n'avez pas encore de machine virtuelle.</p>
			{#if !$auth.user?.is_admin}
				<div class="mt-6">
					<button
						on:click={() => (showCreateModal = true)}
						class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
					>
						Créer une VM
					</button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each vms as vm (vm.vmid)}
				<VMCard {vm} is_admin={$auth.user.is_admin} this_user_id={$auth.user.id}/>
			{/each}
		</div>
	{/if}
</div>

{#if showCreateModal}
	<CreateVMModal on:close={() => (showCreateModal = false)} on:created={handleVMCreated} />
{/if}
