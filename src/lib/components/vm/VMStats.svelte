<script>
	export let vm;

	function formatBytes(bytes) {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
</script>

<div class="bg-white shadow rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<h3 class="text-lg font-medium text-gray-900 mb-4">Statistiques</h3>

		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			<!-- CPU -->
			<div class="bg-gray-50 p-4 rounded-lg">
				<dt class="text-sm font-medium text-gray-500 truncate">CPU</dt>
				<dd class="mt-1">
					<div class="text-lg font-semibold text-gray-900">
						{(parseFloat(vm.cpu) * 100).toFixed(1)}%
					</div>
					<div class="text-sm text-gray-500">
						{vm.cpus} cœurs
					</div>
				</dd>
			</div>

			<!-- Memory -->
			<div class="bg-gray-50 p-4 rounded-lg">
				<dt class="text-sm font-medium text-gray-500 truncate">Mémoire</dt>
				<dd class="mt-1">
					<div class="text-lg font-semibold text-gray-900">
						{formatBytes(vm.mem)}
					</div>
					<div class="text-sm text-gray-500">
						/ {formatBytes(vm.maxmem)}
					</div>
				</dd>
			</div>

			<!-- Disk -->
			<div class="bg-gray-50 p-4 rounded-lg">
				<dt class="text-sm font-medium text-gray-500 truncate">Disque</dt>
				<dd class="mt-1">
					<div class="text-lg font-semibold text-gray-900">
						{formatBytes(vm.disk)}
					</div>
					<div class="text-sm text-gray-500">
						/ {formatBytes(vm.maxdisk)}
					</div>
				</dd>
			</div>

			<!-- Network -->
			<div class="bg-gray-50 p-4 rounded-lg">
				<dt class="text-sm font-medium text-gray-500 truncate">Réseau</dt>
				<dd class="mt-1">
					<div class="text-sm text-gray-900">
						↓ {formatBytes(vm.netin)}
					</div>
					<div class="text-sm text-gray-900">
						↑ {formatBytes(vm.netout)}
					</div>
				</dd>
			</div>
		</div>
	</div>
</div>
