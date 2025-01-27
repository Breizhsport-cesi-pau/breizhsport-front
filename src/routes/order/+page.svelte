<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { goto } from '$app/navigation';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex w-full flex-col items-center gap-4">
	<h1 class="text-center text-4xl">Mes commandes</h1>
	<div>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[200px]">Numéro de la facture</Table.Head>
					<Table.Head>Date de la commande</Table.Head>
					<Table.Head>Status de la commande</Table.Head>
					<Table.Head class="text-right">Code postal de la commande</Table.Head>
					<Table.Head class="text-right">Ville de la commande</Table.Head>
					<Table.Head class="text-right">Adresse de la commande</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.orders.data as order, i (order.id)}
					<Table.Row class="cursor-pointer" onclick={async () => await goto(`/order/${order.id}`)}>
						<Table.Cell class="font-medium">
							{order.id}
						</Table.Cell>
						<Table.Cell class="font-medium">
							{new Date(order.purchase_datetime).getDate()}/{new Date(
								order.purchase_datetime
							).getMonth()}/{new Date(order.purchase_datetime).getFullYear()}
						</Table.Cell>
						<Table.Cell class="font-medium">
							{order.delivery_status}
						</Table.Cell>
						<Table.Cell class="text-right">
							{order.postal_code}
						</Table.Cell>
						<Table.Cell class="text-right">
							{order.city}
						</Table.Cell>
						<Table.Cell class="text-right">
							{order.address}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
