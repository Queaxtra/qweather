<script lang="ts">
    const currentYear = new Date().getFullYear();
    
    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/queaxtra', icon: 'ri-github-line' },
        { name: 'Twitter', href: 'https://twitter.com/queaxtra', icon: 'ri-twitter-x-line' },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/queaxtra', icon: 'ri-linkedin-line' }
    ];
</script>

<footer class="relative bottom-0 left-0 right-0 bg-white/70 backdrop-blur border-t z-50">
    <div class="max-w-7xl mx-auto px-4">
        <div class="py-3">
            <div class="flex items-center justify-between">
                <span class="text-xs text-cDarkPurple">Made with <i class="ri-heart-fill"></i> by Queaxtra</span>
                <div class="flex items-center gap-3">
                    {#each socialLinks as link}
                    <a href={link.href} target="_blank" rel="noopener noreferrer" class="text-cDarkPurple opacity-60 hover:opacity-100 transition-all duration-200" aria-label={link.name}>
                        <i class={link.icon}></i>
                    </a>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</footer>