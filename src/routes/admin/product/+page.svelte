<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge';
	import { displayPrice } from '$lib/utils/price';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	let { data }: { data: PageData } = $props();
	let numberVariant = $state(1);
</script>

<div class="flex w-full flex-col items-center">
	<Dialog.Root>
		<Dialog.Trigger
			class={'fixed bottom-10 right-10 rounded-xl bg-primary p-4 text-primary-foreground duration-200 hover:bg-primary-foreground hover:text-primary'}
			>Ajouter un produit</Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Ajouter un produit</Dialog.Title>
				<Dialog.Description>Ajoutez un produit au catalogue</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name">Nom du produit</Label>
					<Input id="name" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="description">Description</Label>
					<Input id="description" class="col-span-3" />
				</div>
				{#each { length: numberVariant }, n (n)}
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name">Nom du variant</Label>
						<Input id="name" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="description">Couleur</Label>
						<Input id="description" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="description">Taille</Label>
						<Input id="description" class="col-span-3" />
					</div>
					{#if n !== 0}
						<Button variant="destructive">Supprimer le variant</Button>
					{/if}
				{/each}
			</div>
			<Button onclick={() => (numberVariant += 1)}>Ajouter un variant</Button>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
	<h1 class="text-4xl">Gestion des produits</h1>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[200px]">Nom du produit</Table.Head>
				<Table.Head>Catégories</Table.Head>
				<Table.Head>Stock</Table.Head>
				<Table.Head class="text-right">A partir de</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.products.data as product (product.id)}
				<Table.Row
					class="cursor-pointer"
					onclick={async () => await goto(`/admin/product/${product.id}`)}
				>
					<Table.Cell class="font-medium">
						{product.name}
					</Table.Cell>
					<Table.Cell class="flex flex-row gap-4 font-medium">
						{#each product.categories as category}
							<Badge>{category.name}</Badge>
						{/each}
					</Table.Cell>
					<Table.Cell class="font-medium">
						{product.variants
							.map((v) => v.stock)
							.reduce((previousVal, currentVal) => previousVal + currentVal, 0)}
					</Table.Cell>
					<Table.Cell class="text-right font-medium">
						{displayPrice(product.price)}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
