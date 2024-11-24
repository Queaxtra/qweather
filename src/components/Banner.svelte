<script lang="ts">
    import { onDestroy } from 'svelte';
    import type { WeatherData } from '$lib/weather';
    import { fetchWeatherData } from '$lib/weather';

    let cityName: string = '';
    let weatherData: WeatherData | null = null;
    let error: string | null = null;
    let loading: boolean = false;
    let updateInterval: NodeJS.Timer | null = null;

    async function handleSubmit() {
        if (!cityName.trim()) return;

        try {
            loading = true;
            error = null;
            weatherData = await fetchWeatherData(cityName);

            if (updateInterval) clearInterval(updateInterval);

            updateInterval = setInterval(async () => {
                try {
                    weatherData = await fetchWeatherData(cityName);
                } catch (err) {
                    error = (err as Error).message;
                }
            }, 10000);
        } catch (err) {
            error = (err as Error).message;
        } finally {
            loading = false;
        }
    }

    onDestroy(() => {
        if (updateInterval) clearInterval(updateInterval);
    });
</script>

<div class="min-h-screen flex items-center justify-center p-4 pt-20 pb-24">
    <div class="w-full max-w-2xl">
        <div class="space-y-6">
            <div class="flex items-start justify-between bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <div class="flex-1">
                    <h2 class="text-2xl font-semibold text-cDarkPurple mb-2">Weather Search</h2>
                    <p class="text-sm text-cDarkPurple opacity-60">Which city would you like to search for?</p>
                </div>
                <div class="text-2xl text-cPurple">
                    <i class="ri-cloud-line"></i>
                </div>
            </div>

            <div class="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                <form on:submit|preventDefault={handleSubmit} class="flex flex-col sm:flex-row gap-2">
                    <input type="text" bind:value={cityName} placeholder="Enter city name (e.g., London)" class="w-full px-4 py-3 rounded-2xl bg-white border text-sm shadow-sm placeholder:opacity-50 focus:outline-none focus:border-cPurple focus:ring-2 focus:ring-cPurple/20 transition-all duration-200" />
                    <button type="submit" class="w-full sm:w-auto px-6 py-3 bg-cPurple text-white rounded-2xl shadow-sm hover:bg-cHoverPurple transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm" disabled={loading || !cityName}>
                        {#if loading}
                        <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                        {:else}
                        <span class="flex items-center justify-center gap-1">
                            <i class="ri-search-line"></i>
                            Search
                        </span>
                        {/if}
                    </button>
                </form>
            </div>

            {#if error}
            <div class="bg-red-50 backdrop-blur rounded-2xl p-6 shadow-sm border border-red-100">
                <div class="flex items-center gap-2 text-red-600 text-sm">
                    <i class="ri-error-warning-line"></i> {error}
                </div>
            </div>
            {/if}

            {#if weatherData}
            <div class="space-y-6">
                <div class="flex items-start justify-between bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                    <div>
                        <h1 class="text-2xl font-semibold text-cDarkPurple">{weatherData.cityName}</h1>
                        <p class="text-sm text-cDarkPurple opacity-60 flex items-center gap-1">
                            <i class="ri-map-pin-line"></i> {weatherData.country}
                        </p>
                    </div>
                    <div class="text-4xl text-cPurple"><i class={weatherData.weatherCode.emoji}></i></div>
                </div>

                <div class="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                    <div class="flex items-center gap-6 mb-6">
                        <div class="text-6xl font-light text-cDarkPurple">{weatherData.temperature}°</div>
                        <div class="space-y-1">
                            <div class="font-medium text-cDarkPurple">{weatherData.weatherCode.description}</div>
                            <div class="text-sm text-cDarkPurple opacity-60">Feels like {weatherData.feelsLike}°</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="flex items-center gap-3 bg-white rounded-xl p-4 border">
                            <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-cPurple">
                                <i class="ri-windy-line text-xl"></i>
                            </div>
                            <div>
                                <div class="font-medium text-cDarkPurple">{weatherData.windSpeed} km/h</div>
                                <div class="text-xs text-cDarkPurple opacity-60">Wind • {weatherData.windDirection}</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 bg-white rounded-xl p-4 border">
                            <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-cPurple">
                                <i class="ri-drop-line text-xl"></i>
                            </div>
                            <div>
                                <div class="font-medium text-cDarkPurple">{weatherData.humidity}%</div>
                                <div class="text-xs text-cDarkPurple opacity-60">Humidity</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 bg-white rounded-xl p-4 border">
                            <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-cPurple">
                                <i class="ri-sun-line text-xl"></i>
                            </div>
                            <div>
                                <div class="font-medium text-cDarkPurple">{weatherData.uvIndex.value}</div>
                                <div class="text-xs text-cDarkPurple opacity-60">UV • <span class={weatherData.uvIndex.risk.color}>{weatherData.uvIndex.risk.risk}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border">
                    <h2 class="text-lg font-medium text-cDarkPurple mb-4 flex items-center gap-2">
                        <i class="ri-time-line text-cPurple"></i> Hourly Forecast
                    </h2>
                    <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
                        {#each weatherData.hourlyTemperatures as temp, index}
                        <div class="flex flex-col items-center bg-white rounded-xl p-3 border">
                            <div class="text-xs text-cDarkPurple opacity-60">{index}h</div>
                            <div class="text-sm font-medium text-cDarkPurple my-1">{temp}°</div>
                            <div class="text-base text-cPurple"><i class={weatherData.hourlyWeatherCodes[index].emoji}></i></div>
                            <div class="text-xs text-cDarkPurple opacity-60 flex items-center gap-1">
                                <i class="ri-drop-line"></i> {weatherData.precipitationProbability[index]}%
                            </div>
                        </div>
                        {/each}
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex items-center gap-3 bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm border">
                        <div class="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                            <i class="ri-sun-line text-xl"></i>
                        </div>
                        <div>
                            <div class="text-xs text-cDarkPurple opacity-60">Sunrise</div>
                            <div class="font-medium text-cDarkPurple">{weatherData.sunrise}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm border">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <i class="ri-moon-line text-xl"></i>
                        </div>
                        <div>
                            <div class="text-xs text-cDarkPurple opacity-60">Sunset</div>
                            <div class="font-medium text-cDarkPurple">{weatherData.sunset}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>