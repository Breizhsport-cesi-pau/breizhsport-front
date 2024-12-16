<script lang="ts">
	import type { PageData } from './$types';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import GroupSelector from '$lib/components/custom/group-selector.svelte';
	let { data }: { data: PageData } = $props();
	const { product } = data;
</script>

<div class="flex min-h-full w-full flex-row gap-14">
	<div class="w-2/5 pl-12">
		<Carousel.Root
			class="w-ful"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-1">
				{#if browser}
					{#each product.pictures as pic, i (i)}
						<Carousel.Item class="pl-1">
							<div class="p-1">
								<Card.Root class="overflow-hidden hover:cursor-pointer">
									<Card.Content
										class="flex aspect-video items-end justify-center bg-[image:var(--image-url)] bg-[length:100%_100%] p-0"
										--image-url={`url(${pic})`}
									></Card.Content>
								</Card.Root>
							</div>
						</Carousel.Item>
					{/each}
					<Carousel.Item class="pl-1">
						<div class="p-1">
							<Card.Root class="overflow-hidden hover:cursor-pointer">
								<Card.Content
									class="flex aspect-video items-end justify-center bg-[image:var(--image-url)] bg-[length:100%_100%] p-0"
									--image-url={`url(${product.pictures[0]})`}
								></Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/if}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
	<div class="flex flex-1 flex-col">
		<h1 class="text-center text-5xl">{product.name}</h1>
		<p class="text-2xl text-muted-foreground">{product.description}</p>
		<div class="bg-red flex flex-col items-start">
			<h2>Taille</h2>
			<GroupSelector
				options={[
					{ label: 'XL', value: 'XL' },
					{ label: 'XS', value: 'XS' }
				]}
				onClick={console.log}
			></GroupSelector>
		</div>
		<div class="bg-red flex flex-col items-start">
			<h2>Couleur</h2>
			<GroupSelector
				options={[
					{ label: 'Rouge', value: 'Red' },
					{ label: 'Vert', value: 'Green' }
				]}
				onClick={console.log}
			></GroupSelector>
		</div>
		<div
			class="flex flex-row gap-4 self-center rounded-xl border border-solid border-primary p-4 dark:border-white"
		>
			<p class="text-3xl">{product.price}€</p>
			<Button
				class="self-center"
				onclick={() => {
					toast.success('Le produit a été ajouté au panier !', {
						description: product.name,
						action: {
							label: 'Voir le panier',
							onClick: () => console.info('Annuler')
						}
					});
				}}>Ajouter au panier</Button
			>
		</div>
	</div>
</div>
