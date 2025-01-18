<script>
    import { createEventDispatcher } from 'svelte';
    
    export let vm;
    export let deleting = false;
    
    const dispatch = createEventDispatcher();
</script>

<div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Actions</h3>
        
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <!-- Start/Stop -->
            <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">État</h4>
                {#if vm.status === 'running'}
                    <button
                        on:click={() => dispatch('stop')}
                        class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                    >
                        Arrêter la VM
                    </button>
                {:else}
                    <button
                        on:click={() => dispatch('start')}
                        class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                        Démarrer la VM
                    </button>
                {/if}
            </div>

            <!-- Dangerous actions -->
            <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Actions avancées</h4>
                <button
                    on:click={() => dispatch('delete')}
                    disabled={deleting}
                    class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                    {deleting ? 'Suppression...' : 'Supprimer la VM'}
                </button>
            </div>
        </div>

        <!-- Login informations -->
        <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-500 mb-2">Informations de connexion</h4>
            <div class="bg-gray-50 rounded-lg p-4">
                <div class="grid grid-cols-1 gap-2">
                    <div>
                        <span class="text-sm text-gray-500">Adresse IP:</span>
                        <span class="ml-2 text-sm font-medium text-gray-900">{vm.ip_address}</span>
                    </div>
                    <div>
                        <span class="text-sm text-gray-500">Sous-domaine:</span>
                        <span class="ml-2 text-sm font-medium text-gray-900">{vm.subdomain}</span>
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
                    </div>
                    <div>
                        <span class="text-sm text-gray-500">SSH:</span>
                        <code class="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">ssh {vm.vm_id}-root@{import.meta.env.VITE_SSH_IP}</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
