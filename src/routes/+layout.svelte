<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import '../app.css';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import Combobox from '$lib/components/ui/combobox/Combobox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Search from 'lucide-svelte/icons/search';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import { loginInformationStore } from '$lib/stores/login-informations.store';
	import { Badge } from '$lib/components/ui/badge/index.js';
	let { children } = $props();
</script>

<ModeWatcher />
<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<div class="w-[50px]">
				<AspectRatio ratio={1 / 1}>
					<img src="logo.jpg" alt="" class="h-full w-full rounded-md" />
				</AspectRatio>
			</div>
			<Separator orientation="vertical" class="mr-2 h-4" />
			<div class="flex w-full items-center justify-center gap-4">
				<Combobox
					options={[
						{ label: 'Tout les sports', value: 'Tout les sports' },
						{ label: 'test', value: 'test' }
					]}
					placeholder="Tout les sports"
				></Combobox>
				<Input type="search-product" placeholder="Rechercher un produit" class="max-w-sm" />
				<Button size="sm" variant="outline"><Search></Search></Button>
			</div>
			<div class="ml-auto flex items-center justify-center gap-3">
				{#if !$loginInformationStore.isLogged}
					<Button
						onclick={() =>
							loginInformationStore.set({
								isLogged: true,
								data: { firstname: 'Kévin', lastname: 'Moreau' }
							})}>Se connecter</Button
					>
				{/if}
				<Button variant="secondary"><ShoppingCart></ShoppingCart> <Badge>0</Badge></Button>
			</div>
		</header>
		<main>
			{@render children?.()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
