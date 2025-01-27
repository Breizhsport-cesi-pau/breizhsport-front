<script lang="ts" module>
	// sample data
	const data = {
		navMain: [
			{
				title: 'Produits',
				url: '#',
				items: [
					{
						title: 'Derniers ajouts',
						url: '#'
					},
					{
						title: 'Promotions',
						url: '#'
					}
				]
			},
			{
				title: 'Choisir une catégorie',
				url: '#',
				items: [
					{
						title: 'Tennis',
						url: '#'
					},
					{
						title: 'Football',
						url: '#'
					},
					{
						title: 'Musculation',
						url: '#'
					},
					{
						title: 'Footing',
						url: '#'
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import type { ComponentProps } from 'svelte';
	import Package from 'lucide-svelte/icons/package';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import LogOut from 'lucide-svelte/icons/log-out';
	import Settings from 'lucide-svelte/icons/settings';
	import User from 'lucide-svelte/icons/user';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { resetMode, setMode } from 'mode-watcher';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { loginInformationStore } from '$lib/stores/login-informations.store';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import Button from '$lib/components/ui/button/button.svelte';
	import UserService from '$lib/services/user';
	import { goto } from '$app/navigation';
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				{#if $loginInformationStore.isLogged}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton {...props}>
									<Avatar.Root>
										<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
										<Avatar.Fallback
											>{$loginInformationStore.data.firstname.at(
												0
											)}{$loginInformationStore.data.lastname.at(0)}</Avatar.Fallback
										>
									</Avatar.Root>
									{$loginInformationStore.data.firstname}
									{$loginInformationStore.data.lastname}
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Group>
								<DropdownMenu.GroupHeading>Mon compte</DropdownMenu.GroupHeading>
								<DropdownMenu.Separator />
								<DropdownMenu.Group>
									<DropdownMenu.Item>
										<User class="mr-2 size-4" />
										<span>Mon profile</span>
									</DropdownMenu.Item>
									<DropdownMenu.Item
										onclick={async () => {
											await goto('/order');
										}}
									>
										<Package class="mr-2 size-4" />
										<span>Commandes</span>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<Settings class="mr-2 size-4" />
										<span>Paramètres</span>
									</DropdownMenu.Item>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<LifeBuoy class="mr-2 size-4" />
									<span>Contact</span>
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item
									onclick={async () => {
										await UserService.logout();
										await goto('/');
									}}
								>
									<LogOut class="mr-2 size-4" />
									<span>Se déconnecter</span>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Button href="/login">Se connecter</Button>
				{/if}
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content class="gap-0">
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Collapsible.Root title={group.title} open={true} class="group/collapsible">
				<Sidebar.Group>
					<Sidebar.GroupLabel
						class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
					>
						{#snippet child({ props })}
							<Collapsible.Trigger {...props}>
								{group.title}
								<ChevronRight
									class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
								/>
							</Collapsible.Trigger>
						{/snippet}
					</Sidebar.GroupLabel>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each group.items as item (item.title)}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton isActive={'isActive' in item}>
											{#snippet child({ props })}
												<a href={item.url} {...props}>{item.title}</a>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>
		{/each}
	</Sidebar.Content>
	<Sidebar.Footer>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item onclick={() => setMode('light')}>Clair</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => setMode('dark')}>Sombre</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => resetMode()}>Par défaut (système)</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
