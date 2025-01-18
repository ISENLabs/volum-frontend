<script>
    import Navbar from './Navbar.svelte';
</script>
  
<div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
    </main>
</div>