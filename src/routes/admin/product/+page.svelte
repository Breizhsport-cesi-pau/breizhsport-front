<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge';
	import { displayPrice } from '$lib/utils/price';
	import Button from '$lib/components/ui/button/button.svelte';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex w-full flex-col items-center">
	<Button class="fixed bottom-10 right-10" href="/admin/product/add">Ajouter un produit</Button>
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
