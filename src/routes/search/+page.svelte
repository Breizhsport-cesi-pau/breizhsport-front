<script lang="ts">
	import ProductCard from '$lib/components/custom/product-card.svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { flip } from 'svelte/animate';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex min-h-full w-full flex-col items-center gap-4">
	<h1 class="text-4xl">
		Résultats
		{#if data.keyword !== ''}
			pour <span class="font-bold">{data.keyword}</span>
		{/if}
	</h1>
	{#if data.result.data.length === 0}
		<h2 class="text-3xl">Aucun produit correspondant</h2>
	{:else}
		<div class="flex w-full flex-row flex-wrap justify-evenly gap-4">
			{#each data.result.data as product, i (product.id)}
				<div animate:flip={{ duration: 300 }} transition:fade={{ duration: 200 }}>
					<ProductCard
						description={product.description}
						image={product.pictures[0]}
						name={product.name}
						price={`A partir de ${product.price}€`}
						url={`/product/${product.id}`}
						categories={product.categories.map((c) => c.name)}
					></ProductCard>
				</div>
			{/each}
		</div>
		<Pagination.Root
			count={25 * data.result.numberOfPages}
			perPage={25}
			siblingCount={1}
			class="mt-auto"
		>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton>
							<ChevronLeft class="size-4" />
							<span class="hidden sm:block">Précédent</span>
						</Pagination.PrevButton>
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton>
							<span class="hidden sm:block">Suivant</span>
							<ChevronRight class="size-4" />
						</Pagination.NextButton>
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	{/if}
</div>
