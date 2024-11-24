<script lang="ts">
    import { fly } from "svelte/transition";
    let isMenuOpen = false;
    
    const links = [
        { name: 'About', href: '/about', icon: 'ri-information-line' },
        { name: 'GitHub', href: 'https://github.com/queaxtra/qweather', icon: 'ri-github-line' }
    ];

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };
</script>

<nav class="relative bg-white/70 backdrop-blur border-b z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <a href="/" class="flex items-center gap-2">
                <i class="ri-cloud-line text-2xl text-cPurple"></i>
                <span class="text-xl font-semibold text-cDarkPurple">qWeather</span>
            </a>
            
            <div class="hidden sm:flex items-center gap-6">
                {#each links as link}
                <a href={link.href} class="flex items-center gap-1 text-sm text-cDarkPurple opacity-60 hover:opacity-100 transition-all duration-200">
                    <i class={link.icon}></i>
                    {link.name}
                </a>
                {/each}
            </div>

            <button class="sm:hidden text-cDarkPurple" on:click={toggleMenu} aria-label="Toggle menu">
                <i class={isMenuOpen ? "ri-close-line" : "ri-menu-line"} class:text-xl={!isMenuOpen}></i>
            </button>
        </div>
    </div>

    {#if isMenuOpen}
    <div class="sm:hidden absolute top-16 left-0 right-0 bg-white border-b" transition:fly={{ y: -5, duration: 200 }}>
        <div class="max-w-7xl mx-auto">
            <div class="px-4 py-2 flex items-center justify-end gap-4">
                {#each links as link}
                <a href={link.href} class="flex items-center gap-1 text-sm text-cDarkPurple opacity-60 hover:opacity-100 transition-all duration-200">
                    <i class={link.icon}></i>
                    {link.name}
                </a>
                {/each}
            </div>
        </div>
    </div>
    {/if}
</nav>