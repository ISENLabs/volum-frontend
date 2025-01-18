<script>
	import { page } from '$app/stores';
	import auth from '$lib/stores/auth';
</script>

<nav class="bg-white shadow">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex">
				<div class="flex-shrink-0 flex items-center">
					<img class="h-8 w-auto" src="/images/logo.svg" alt="Volum" />
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<a
						href="/"
						class="inline-flex items-center px-1 pt-1 {$page.url.pathname === '/'
							? 'border-b-2 border-indigo-500 text-gray-900'
							: 'text-gray-500 hover:text-gray-700'}"
					>
						Accueil
					</a>
				</div>
			</div>

			<div class="flex items-center">
				{#if $auth.user}
					<span class="text-sm text-gray-700">
						{$auth.user.firstname}
						{$auth.user.lastname}
					</span>
				{/if}
			</div>
		</div>
	</div>
</nav>
