<script lang="ts">
	import { browser } from '$app/environment';
	import ProductCard from '$lib/components/custom/product-card.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { displayPrice } from '$lib/utils/price.js';
	const { data } = $props();
</script>

<div class="flex flex-col items-center gap-10">
	<h1 class="text-6xl">Bienvenue chez BreizhSport !</h1>
	<div class="flex w-full flex-col items-center gap-4 pl-4">
		<h2 class="text-4xl">Nouveaux arrivages</h2>
		<Carousel.Root
			class="h-44 w-full max-w-6xl"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-1">
				{#if browser}
					{#each data.newComers as pic, i (i)}
						<Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
							<div class="p-1">
								<Card.Root class="group overflow-hidden hover:cursor-pointer">
									<Card.Content
										class="flex aspect-video items-end justify-center bg-[image:var(--image-url)] bg-[length:100%_100%] p-0 duration-500 hover:bg-[length:105%_105%]"
										--image-url={`url(${pic.url})`}
									>
										<div
											class="flex h-full w-full select-none items-center bg-gradient-to-t from-black p-5 opacity-0 duration-500 group-hover:opacity-100"
										>
											<p class="relative top-10 text-xl text-white">{pic.name}</p>
										</div>
									</Card.Content>
								</Card.Root>
							</div>
						</Carousel.Item>
					{/each}
				{/if}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
	<h2 class="text-4xl font-bold">Rien que pour vous.</h2>
	<div class="mt-6 grid grid-cols-3 gap-10">
		<div class="flex flex-col items-center gap-3">
			<h3 class="text-2xl">Envie de courir ?</h3>
			<ProductCard
				description={data.runningProduct.description}
				image={data.runningProduct.pictures[0]}
				name={data.runningProduct.name}
				price={`A partir de ${displayPrice(data.footProduct.variants.sort((a, b) => a.price - b.price)[0].price)}`}
				url={`/product/${data.runningProduct.id}`}
				categories={data.runningProduct.categories.map((c) => c.name)}
			></ProductCard>
		</div>
		<div class="flex flex-col items-center gap-3">
			<h3 class="text-2xl">Vous êtes plutot raquette</h3>
			<ProductCard
				description={data.tennisProduct.description}
				image={data.tennisProduct.pictures[0]}
				name={data.tennisProduct.name}
				price={`A partir de ${displayPrice(data.footProduct.variants.sort((a, b) => a.price - b.price)[0].price)}`}
				url={`/product/${data.tennisProduct.id}`}
				categories={data.tennisProduct.categories.map((c) => c.name)}
			></ProductCard>
		</div>
		<div class="flex flex-col items-center gap-3">
			<h3 class="text-2xl">Le foot ca vous connais</h3>
			<ProductCard
				description={data.footProduct.description}
				image={data.footProduct.pictures[0]}
				name={data.footProduct.name}
				price={`A partir de ${displayPrice(data.footProduct.variants.sort((a, b) => a.price - b.price)[0].price)}`}
				url={`/product/${data.footProduct.id}`}
				categories={data.footProduct.categories.map((c) => c.name)}
			></ProductCard>
		</div>
	</div>
</div>
