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
	import { loginInformationStore, UserRole } from '$lib/stores/login-informations.store';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Toaster } from '$lib/components/ui/sonner';
	import { cartStore } from '$lib/stores/cart';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	let { data, children } = $props();
	let search = $state('');
	let category = $state('Toutes les catégories');
	let urlSearch = $derived.by(() => {
		if (browser) {
			const url = new URL(window.location.origin);
			url.pathname = '/search';
			url.searchParams.append('keyword', search);
			if (category !== 'Toutes les catégories') {
				url.searchParams.append('category', category);
			}
			return url.toString();
		}
		return '';
	});
	$effect(() => {
		const keyword = $page.url.searchParams.get('keyword');
		if ($page.url.pathname.startsWith('/search') && keyword !== null) {
			search = keyword;
		} else {
			search = '';
		}
	});
</script>

<Toaster />
<ModeWatcher />
<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<div class="w-[50px]">
				<a href="/">
					<AspectRatio ratio={1 / 1}>
						<img src="logo.jpg" alt="" class="h-full w-full rounded-md" />
					</AspectRatio>
				</a>
			</div>
			<Separator orientation="vertical" class="mr-2 h-4" />
			<div class="flex w-full items-center justify-center gap-4">
				<Combobox
					bind:value={category}
					options={[
						{ label: 'Toutes les catégories', value: 'Toutes les catégories' },
						...data.categories.data.map((c) => {
							return {
								label: c.name,
								value: c.id.toString()
							};
						})
					]}
					placeholder="Toutes les catégories"
				></Combobox>
				<Input
					autocomplete="new-password"
					type="text"
					placeholder="Rechercher un produit"
					class="max-w-sm"
					bind:value={search}
				/>
				<Button size="sm" variant="outline" href={urlSearch}><Search></Search></Button>
			</div>
			<div class="ml-auto flex items-center justify-center gap-3">
				{#if !$loginInformationStore.isLogged}
					<Button href="/login">Se connecter</Button>
				{/if}
				{#if $loginInformationStore.isLogged && $loginInformationStore.data.role === UserRole.Admin}
					<Badge variant="outline" href="/admin">Admin</Badge>
				{/if}
				<Button variant="secondary" href="/cart"
					><ShoppingCart></ShoppingCart> <Badge>{$cartStore.length}</Badge></Button
				>
			</div>
		</header>
		<main class="flex-1 p-4">
			{@render children?.()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
