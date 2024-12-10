<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
</script>

<div class="mt-4 flex flex-col items-center gap-10">
	<h1 class="text-6xl">Bienvenue chez BreizhSport !</h1>
	<div class="flex w-full flex-col items-center gap-4 pl-4">
		<h2 class="text-4xl">Nouveaux arrivages</h2>
		<Carousel.Root class="w-full max-w-6xl">
			<Carousel.Content class="-ml-1">
				{#each Array(15) as _, i (i)}
					<Carousel.Item class="pl-1 md:basis-1/2 lg:basis-1/3">
						<div class="p-1">
							<Card.Root>
								<Card.Content class="flex aspect-video items-center justify-center p-6">
									<span class="text-2xl font-semibold">{i + 1}</span>
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
</div>
