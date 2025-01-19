<script>
	import { createEventDispatcher } from 'svelte';
	import { createVM } from '$lib/api/vm';

	const dispatch = createEventDispatcher();

	let loading = false;
	let error = null;
	let form = {
		server_name: '',
		subdomain: ''
	};
	let password = '';
	let showPassword = false;
	let copied = false;

	async function handleSubmit() {
		try {
			loading = true;
			error = null;
			const result = await createVM(form);
			if(!result.success) {
				throw new Error(result.error);
			}
			password = result.data[0].password;
			showPassword = true;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	function handleClose() {
		if (!loading) {
			dispatch('close');
			// reload page
			location.reload();
		}
	}
</script>

<div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
	<div class="bg-white rounded-lg max-w-md w-full overflow-hidden">
		<div class="px-6 py-4">
			<h3 class="text-lg font-medium text-gray-900">
				{showPassword ? 'Votre VM est prête !' : 'Créer une nouvelle VM'}
			</h3>
		</div>

		{#if showPassword}
			<div class="px-6 py-4">
				<p class="text-sm text-gray-500 mb-4">
					Voici les informations de connexion à votre VM. Conservez bien le mot de passe, il ne sera
					plus affiché par la suite.
				</p>

				<div class="bg-gray-50 rounded-md p-4">
					<p class="text-sm font-medium text-gray-700">Mot de passe :</p>
					<div class="relative">
						<button 
							type="button"
							class="font-mono mt-1 text-sm cursor-pointer hover:bg-gray-200 p-1 rounded w-full text-left flex justify-between items-center group"
							on:click={() => {
								navigator.clipboard.writeText(password);
								copied = true;
								setTimeout(() => copied = false, 2000);
							}}
							on:keydown={(e) => {
								if (e.key === 'Enter') {
									navigator.clipboard.writeText(password);
									copied = true;
									setTimeout(() => copied = false, 2000);
								}
							}}
							title="Cliquer pour copier"
						>
							<span>{password}</span>
							<svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								{#if copied}
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								{:else}
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
								{/if}
							</svg>
						</button>
					</div>
				</div>

				<button
					class="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
					on:click={handleClose}
				>
					J'ai copié mon mot de passe
				</button>
			</div>
		{:else}
			<form on:submit|preventDefault={handleSubmit} class="px-6 py-4">
				{#if error}
					<div class="mb-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4">
						{error}
					</div>
				{/if}

				<div class="space-y-4">
					<div>
						<label for="server_name" class="block text-sm font-medium text-gray-700">
							Nom du serveur
						</label>
						<input
							type="text"
							name="server_name"
							id="server_name"
							bind:value={form.server_name}
							class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
							required
						/>
					</div>

					<div>
						<label for="subdomain" class="block text-sm font-medium text-gray-700">
							Sous-domaine
						</label>
						<input
							type="text"
							name="subdomain"
							id="subdomain"
							bind:value={form.subdomain}
							class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<div class="mt-6 flex justify-end space-x-3">
					<button
						type="button"
						class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
						on:click={handleClose}
						disabled={loading}
					>
						Annuler
					</button>
					<button
						type="submit"
						class="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
						disabled={loading}
					>
						{loading ? 'Création en cours...' : 'Créer'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>
