<script lang="ts">
	import { displayPrice } from '$lib/utils/price';
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	let { data }: { data: PageData } = $props();
	const totalPrice = data.order.sold_products
		.map((p) => p.price * p.quantity)
		.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
</script>

<div class="flex w-full flex-col">
	<h1 class="text-center text-4xl">Ma commandes</h1>
	<div class="flex flex-row gap-4">
		<div class="flex w-2/3 flex-col items-center">
			<h2 class="text-3xl">Produits</h2>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[200px]">Nom du produit</Table.Head>
						<Table.Head>Couleur</Table.Head>
						<Table.Head>Taille</Table.Head>
						<Table.Head>Prix à l'unité</Table.Head>
						<Table.Head>Quantité</Table.Head>
						<Table.Head class="text-right">Prix total</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.order.sold_products as product, i (product.id_variant)}
						<Table.Row>
							<Table.Cell class="font-medium">
								{data.soldProducts[i].productName}
							</Table.Cell>
							<Table.Cell class="font-medium">
								{data.soldProducts[i].color}
							</Table.Cell>
							<Table.Cell class="font-medium">
								{data.soldProducts[i].size}
							</Table.Cell>
							<Table.Cell>
								{displayPrice(product.price)}
							</Table.Cell>
							<Table.Cell>
								{product.quantity}
							</Table.Cell>
							<Table.Cell class="text-right">
								{displayPrice(product.quantity * product.price)}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2 rounded-md bg-secondary p-4 text-center">
				<p class="text-xl font-bold">Date de la commande</p>
				<p>
					{new Date(data.order.purchase_datetime).getDate()}/{new Date(
						data.order.purchase_datetime
					).getMonth()}/{new Date(data.order.purchase_datetime).getFullYear()}
				</p>
			</div>
			<div class="flex flex-col gap-2 rounded-md bg-secondary p-4 text-center">
				<p class="text-xl font-bold">Total</p>
				<p>
					{displayPrice(totalPrice)}
				</p>
			</div>
			<div class="flex flex-col gap-2 rounded-md bg-secondary p-4 text-center">
				<p class="text-xl font-bold">Status</p>
				<p>
					{data.order.delivery_status}
				</p>
			</div>
			<div class="flex flex-col gap-2 rounded-md bg-secondary p-4 text-center">
				<p class="text-xl font-bold">Informations sur la livraison</p>
				<p class="font-bold">Code postal</p>
				<p>
					{data.order.postal_code}
				</p>
				<p class="font-bold">Ville</p>
				<p>
					{data.order.city}
				</p>
				<p class="font-bold">Adresse</p>
				<p>
					{data.order.address}
				</p>
			</div>
		</div>
	</div>
</div>
