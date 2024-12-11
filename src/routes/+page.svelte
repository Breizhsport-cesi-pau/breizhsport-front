<script lang="ts">
	import ProductCard from '$lib/components/custom/product-card.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	const picCarroussel = [
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{
			url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg',
			name: 'Test 1'
		},
		{ url: 'https://img.freepik.com/photos-gratuite/outils-sport_53876-138077.jpg', name: 'Test 1' }
	];
</script>

<div class="mt-4 flex flex-col items-center gap-10">
	<h1 class="text-6xl">Bienvenue chez BreizhSport !</h1>
	<div class="flex w-full flex-col items-center gap-4 pl-4">
		<h2 class="text-4xl">Nouveaux arrivages</h2>
		<Carousel.Root
			class="w-full max-w-6xl"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-1">
				{#each picCarroussel as pic, i (i)}
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
				description="Parfait pour dépasser mami."
				image="https://blog.therunningcollective.fr/wp-content/uploads/2023/12/Peg-41-1024x586.jpeg"
				name="Chaussures de ouf"
				price="29.99€"
				url="#"
				categories={['Running', 'Chaussure']}
			></ProductCard>
		</div>
		<div class="flex flex-col items-center gap-3">
			<h3 class="text-2xl">Vous êtes plutot raquette</h3>
			<ProductCard
				description="Pour remplacer Nadal."
				image="https://cdn.drouot.com/d/image/lot?size=phare&path=140/13558/139.jpg"
				name="Raquette de pro"
				price="49.99€"
				url="#"
				categories={['Tennis', 'Raquette']}
			></ProductCard>
		</div>
		<div class="flex flex-col items-center gap-3">
			<h3 class="text-2xl">Le foot ca vous connais</h3>
			<ProductCard
				description="Pour ne pas rater les pennos comme MBappé"
				image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfvFtoucpGFanezM2l-1l7bX_US6J1Z84cZA&s"
				name="Ballon haute voltige"
				price="15.99€"
				url="#"
				categories={['Foot', 'Ballon']}
			></ProductCard>
		</div>
	</div>
</div>
