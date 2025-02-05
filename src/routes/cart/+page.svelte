<script lang="ts">
    import NumberAdder from '$lib/components/custom/NumberAdder.svelte';
    import Badge from '$lib/components/ui/badge/badge.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Separator } from '$lib/components/ui/separator';
    import { cartStore } from '$lib/stores/cart';
    import { toast } from 'svelte-sonner';
    import type { PageData } from './$types';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { displayPrice } from '$lib/utils/price';
    import Label from '$lib/components/ui/label/label.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import JSConfetti from 'js-confetti';
    import delay from '$lib/utils/delay';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import orderService from '$lib/services/order';
    import { deliveryStatusEnum } from '$lib/models/order';

    let { data }: { data: PageData } = $props();
    let loading = $state(false);
    let isDialogOpen = $state(false);
</script>

<div class="flex w-full flex-col items-center gap-4">
    <h1 class="text-5xl">Mon panier</h1>
    {#if $cartStore.length === 0}
        <p class="text-center text-2xl">
            Ca panier est vide ! Réglez moi <a href="/" class="underline underline-offset-4">ça</a> !
        </p>
    {:else}
        <div class="flex w-full flex-row gap-4">
            <div class="w-2/3">
                {#each $cartStore as cartProduct, i (cartProduct.idVariant)}
                    {@const { product, variant, quantity } = data.allCartProducts.find(
                        (p) => p.variant.id === cartProduct.idVariant
                    ) as any}
                    <div animate:flip={{ duration: 300 }} transition:fade={{ duration: 200 }}>
                        <div class="h-18 flex flex-row gap-4">
                            <a
                                style={`--image-url: url()`}
                                aria-label={`Lien vers le produit ${product.name}`}
                                class={`aspect-video h-full w-1/5 rounded-md bg-[image:var(--image-url)] bg-cover bg-center`}
                                href={`/product/${product.id}`}
                            ></a>
                            <div class="flex flex-1 flex-col gap-2">
                                <a
                                    class="text-xl underline-offset-4 hover:underline"
                                    href={`/product/${product.id}`}>{product.name}</a
                                >
                                <div class="flex select-none flex-row gap-4">
                                    <Badge>{variant?.color}</Badge>
                                    <Badge>{variant?.size}</Badge>
                                </div>
                                <div class="max-w-40">
                                    <NumberAdder
                                        bind:number={$cartStore[i].quantity}
                                        min={1}
                                        max={variant.stock}
                                    ></NumberAdder>
                                </div>
                            </div>
                            <div class="h-18 flex flex-col justify-between">
                                <Button
                                    variant="outline"
                                    onclick={async () => {
                                        const item = { ...$cartStore[i] };
                                        cartStore.removeProduct(product.id, variant.id);
                                        toast.success(
                                            `${product.name} a été supprimé du panier !`,
                                            {
                                                description: "Vous avez changé d'avis ?",
                                                action: {
                                                    label: 'Annuler',
                                                    onClick: () =>
                                                        cartStore.addProduct(
                                                            item.idProduct,
                                                            item.idVariant,
                                                            item.quantity
                                                        )
                                                }
                                            }
                                        );
                                    }}>Supprimer du panier</Button
                                >
                                <div class="text-right">
                                    <p>{displayPrice(variant.price)} à l'unité</p>
                                    <p class="text-xl font-bold">
                                        {displayPrice(variant.price * $cartStore[i].quantity)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Separator class="my-4"></Separator>
                    </div>
                {/each}
            </div>
            <Separator orientation="vertical" class="mr-2" />
            <div class="flex flex-1 flex-col items-center">
                <h2 class="text-3xl">Détails</h2>
                <div class="flex w-full flex-col gap-4 pl-6 pr-6">
                    <div>
                        <Label>Code postal</Label>
                        <Input type="number" />
                    </div>
                    <div>
                        <Label>Adresse de livraison</Label>
                        <Input />
                    </div>
                    <div class="flex flex-row justify-between">
                        <h3 class="text-lg">
                            Total : <span class="font-bold">
                                {displayPrice(
                                    $cartStore
                                        .map((c, i) => {
                                            const { price } = data.allCartProducts[i].variant;
                                            return price * c.quantity;
                                        })
                                        .reduce(
                                            (currentValue, accumulator) =>
                                                currentValue + accumulator,
                                            0
                                        )
                                )}
                            </span>
                        </h3>
                        <Button
                            disabled={loading}
                            onclick={async () => {
                                loading = true;
                                await orderService.createOne({
                                    address: "8 Rue des Frères Charles et Alcide d'Orbigny",
                                    city: 'Pau',
                                    delivery_status: deliveryStatusEnum.Enum.Payed,
                                    id_user: '4ebf14fd-7cca-47b4-a870-e7153389a5f7',
                                    postal_code: '64000',
                                    purchase_datetime: new Date().toISOString(),
                                    sold_products: $cartStore.map((p, i) => {
                                        const { price } = data.allCartProducts[i].variant;
                                        return {
                                            price,
                                            quantity: p.quantity,
                                            id_variant: p.idVariant,
                                            id_order: '4ebf14fd-7cca-47b4-a870-e7153389a5f7'
                                        };
                                    })
                                });
                                await delay(3000);
                                loading = false;
                                const jsConfetti = new JSConfetti();

                                jsConfetti.addConfetti();
                                cartStore.set([]);
                                await delay(500);
                                isDialogOpen = true;
                            }}
                            >{#if loading}
                                Chargement...
                            {:else}
                                Payer
                            {/if}</Button
                        >
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
<Dialog.Root bind:open={isDialogOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Commande réussite ! Féclitiation ! 🎉</Dialog.Title>
            <Dialog.Description>Que voulez vous faire ?</Dialog.Description>
        </Dialog.Header>
        <div class="flex flex-row justify-between">
            <Button href="/">Retourner au menu principal</Button>
            <Button variant="outline" href="#">Voir mes commandes en cours</Button>
        </div>
    </Dialog.Content>
</Dialog.Root>
