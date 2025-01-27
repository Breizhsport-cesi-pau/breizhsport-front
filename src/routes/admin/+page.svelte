<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex w-full flex-col items-center gap-4">
	<h1 class="text-5xl">Panneau Administrateur</h1>
	<div class="flex w-full flex-row">
		<a href="/admin/product">
			<Card.Root>
				<Card.Header><Card.Title>Produits</Card.Title></Card.Header>
				<Card.Content>Panel d'administration pour les produits</Card.Content>
				<Card.Footer>
					<Card.Description>Gérez les produits de votre site</Card.Description>
				</Card.Footer>
			</Card.Root>
		</a>
	</div>
</div>
