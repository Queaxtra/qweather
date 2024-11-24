<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="min-h-screen flex items-center justify-center p-4 pt-20 pb-24">
    <div class="w-full max-w-md">
        <div class="space-y-6">
            <div class="flex items-start justify-between bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <div class="flex-1">
                    <h1 class="text-2xl font-semibold text-cDarkPurple mb-2">Error {$page.status}</h1>
                    <p class="text-sm text-cDarkPurple opacity-60">{$page.error?.message || 'An unexpected error occurred.'}</p>
                </div>
                <div class="text-4xl text-cPurple">
                    <i class="ri-error-warning-line"></i>
                </div>
            </div>

            <div class="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <div class="flex flex-col items-center gap-4 text-center">
                    <div class="space-y-2">
                        <p class="font-medium text-cDarkPurple">Something went wrong</p>
                        <p class="text-sm text-cDarkPurple opacity-60">Please try refreshing the page or go back to the home page.</p>
                    </div>
                    <div class="flex gap-3">
                        <button class="px-4 py-2 bg-white text-cDarkPurple rounded-xl border shadow-sm transition-all duration-200" on:click={() => window.location.reload()}>
                            <i class="ri-refresh-line mr-1"></i>
                            Refresh
                        </button>
                        <a href="/" class="px-4 py-2 bg-cPurple text-white rounded-xl shadow-sm hover:bg-cHoverPurple hover:shadow-md transition-all duration-200">
                            <i class="ri-home-line mr-1"></i>
                            Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
