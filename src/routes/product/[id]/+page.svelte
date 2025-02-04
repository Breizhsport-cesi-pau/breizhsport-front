<script lang="ts">
    import type { PageData } from './$types';
    import * as Carousel from '$lib/components/ui/carousel/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import { browser } from '$app/environment';
    import Button from '$lib/components/ui/button/button.svelte';
    import { toast } from 'svelte-sonner';
    import GroupSelector from '$lib/components/custom/group-selector.svelte';
    import NumberAdder from '$lib/components/custom/NumberAdder.svelte';
    import { cartStore } from '$lib/stores/cart';
    import { goto } from '$app/navigation';
    import { displayPrice } from '$lib/utils/price';
    import { getPictureUrl } from '$lib/utils/picture';
    let { data }: { data: PageData } = $props();
    const { product } = data;
    let quantity = $state(1);
    let color = $state(product.variants[0].color);
    let size = $state(product.variants[0].size);
    const pictures = product.variants.map((v) => v.pictures).flat();
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
                    {#each pictures as pic, i (i)}
                        <Carousel.Item class="pl-1">
                            <div class="p-1">
                                <Card.Root class="overflow-hidden hover:cursor-pointer">
                                    <Card.Content
                                        class="flex aspect-video items-end justify-center bg-[image:var(--image-url)] bg-[length:100%_100%] p-0"
                                        --image-url={`url(${getPictureUrl(pic.url)}`}
                                    ></Card.Content>
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
    <div class="flex flex-1 flex-col">
        <h1 class="text-center text-5xl">{product.name}</h1>
        <p class="text-2xl text-muted-foreground">{product.description}</p>
        <div class="bg-red flex flex-col items-start">
            <h2>Taille</h2>
            <GroupSelector
                options={Array.from(new Set(product.variants.map((v) => v.size))).map((s) => {
                    return {
                        label: s,
                        value: s,
                        disabled: !product.variants.some((v) => v.color === color && v.size === s)
                    };
                })}
                bind:selected={size}
            ></GroupSelector>
        </div>
        <div class="bg-red flex flex-col items-start">
            <h2>Couleur</h2>
            <GroupSelector
                options={Array.from(new Set(product.variants.map((v) => v.color))).map((c) => {
                    return {
                        label: c,
                        value: c,
                        disabled: !product.variants.some((v) => v.size === size && v.color === c)
                    };
                })}
                bind:selected={color}
            ></GroupSelector>
        </div>
        <div
            class="flex flex-col gap-4 self-center rounded-xl border border-solid border-primary p-4 dark:border-white"
        >
            <NumberAdder
                bind:number={quantity}
                min={1}
                max={product.variants.find((v) => v.size === size && v.color === color)?.stock ||
                    10}
            ></NumberAdder>
            <div class="flex flex-row gap-4">
                <p class="text-3xl">
                    {displayPrice(product.variants.sort((a, b) => a.price - b.price)[0].price)}
                </p>
                <Button
                    class="self-center"
                    onclick={() => {
                        const variant = product.variants.find(
                            (v) => v.size === size && v.color === color
                        );
                        if (variant === undefined)
                            return toast.error('Une erreur est survenue', {
                                description: 'Actualiser la page',
                                action: {
                                    label: 'Actulaiser',
                                    onClick: window.location.reload
                                }
                            });
                        cartStore.addProduct(product.id, variant.id, quantity);
                        toast.success('Le produit a été ajouté au panier !', {
                            description: product.name,
                            action: {
                                label: 'Voir le panier',
                                onClick: async () => await goto('/cart')
                            }
                        });
                    }}>Ajouter au panier</Button
                >
            </div>
        </div>
    </div>
</div>
