<script>
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Navbar />

<div class="min-h-screen flex items-center justify-center p-4 pt-20 pb-24">
    <div class="w-full max-w-2xl">
        <div class="space-y-6">
            <div class="flex items-start justify-between bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <div class="flex-1">
                    <h1 class="text-2xl font-semibold text-cDarkPurple mb-2">About qWeather</h1>
                    <p class="text-sm text-cDarkPurple opacity-60">A modern and responsive weather application that provides real-time weather information and forecasts.</p>
                </div>
                <div class="text-4xl text-cPurple">
                    <i class="ri-cloud-line"></i>
                </div>
            </div>

            <div class="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <h2 class="text-lg font-medium text-cDarkPurple mb-4 flex items-center gap-2">
                    <i class="ri-star-line text-cPurple"></i> Features
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-4 bg-white rounded-xl border">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-cPurple">
                                <i class="ri-temp-hot-line"></i>
                            </div>
                            <span class="font-medium text-cDarkPurple">Real-time Weather</span>
                        </div>
                        <p class="text-sm text-cDarkPurple opacity-60">Get current weather conditions including temperature and weather description</p>
                    </div>
                    <div class="p-4 bg-white rounded-xl border">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-cPurple">
                                <i class="ri-dashboard-3-line"></i>
                            </div>
                            <span class="font-medium text-cDarkPurple">Detailed Metrics</span>
                        </div>
                        <p class="text-sm text-cDarkPurple opacity-60">View wind speed, humidity, and UV index with risk levels</p>
                    </div>
                    <div class="p-4 bg-white rounded-xl border">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-cPurple">
                                <i class="ri-time-line"></i>
                            </div>
                            <span class="font-medium text-cDarkPurple">Hourly Forecast</span>
                        </div>
                        <p class="text-sm text-cDarkPurple opacity-60">Check temperature and precipitation probability for upcoming hours</p>
                    </div>
                    <div class="p-4 bg-white rounded-xl border">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-cPurple">
                                <i class="ri-sun-line"></i>
                            </div>
                            <span class="font-medium text-cDarkPurple">Sun Times</span>
                        </div>
                        <p class="text-sm text-cDarkPurple opacity-60">Track daily sunrise and sunset timings</p>
                    </div>
                </div>
            </div>

            <div class="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <h2 class="text-lg font-medium text-cDarkPurple mb-4 flex items-center gap-2">
                    <i class="ri-code-s-slash-line text-cPurple"></i> Tech Stack
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-white rounded-xl border">
                        <i class="ri-code-line text-2xl text-cPurple mb-2"></i>
                        <div class="font-medium text-cDarkPurple">SvelteKit</div>
                        <div class="text-xs text-cDarkPurple opacity-60">Framework</div>
                    </div>
                    <div class="text-center p-4 bg-white rounded-xl border">
                        <i class="ri-palette-line text-2xl text-cPurple mb-2"></i>
                        <div class="font-medium text-cDarkPurple">TailwindCSS</div>
                        <div class="text-xs text-cDarkPurple opacity-60">Styling</div>
                    </div>
                    <div class="text-center p-4 bg-white rounded-xl border">
                        <i class="ri-remixicon-line text-2xl text-cPurple mb-2"></i>
                        <div class="font-medium text-cDarkPurple">Remix Icons</div>
                        <div class="text-xs text-cDarkPurple opacity-60">Icons</div>
                    </div>
                    <div class="text-center p-4 bg-white rounded-xl border">
                        <i class="ri-cloud-line text-2xl text-cPurple mb-2"></i>
                        <div class="font-medium text-cDarkPurple">Open Meteo</div>
                        <div class="text-xs text-cDarkPurple opacity-60">Weather API</div>
                    </div>
                </div>
            </div>

            <div class="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <div class="flex flex-col sm:flex-row items-center gap-6">
                    <div class="flex-1">
                        <h2 class="text-lg font-medium text-cDarkPurple mb-2">Created by Queaxtra</h2>
                        <p class="text-sm text-cDarkPurple opacity-60 mb-4">I'm a web developer passionate about creating beautiful and functional web experiences.</p>
                        <div class="flex items-center gap-3">
                            <a href="https://github.com/queaxtra" target="_blank" rel="noopener noreferrer" class="text-cDarkPurple opacity-60 hover:opacity-100 transition-all duration-200">
                                <i class="ri-github-line text-xl"></i>
                            </a>
                            <a href="https://twitter.com/queaxtra" target="_blank" rel="noopener noreferrer" class="text-cDarkPurple opacity-60 hover:opacity-100 transition-all duration-200">
                                <i class="ri-twitter-x-line text-xl"></i>
                            </a>
                        </div>
                    </div>
                    <div class="w-20 h-20 rounded-2xl bg-purple-50 flex items-center justify-center text-cPurple">
                        <i class="ri-user-smile-line text-4xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<Footer />