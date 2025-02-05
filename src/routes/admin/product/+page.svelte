<script lang="ts">
    import type { PageData } from './$types';
    import * as Table from '$lib/components/ui/table/index.js';
    import { goto, invalidateAll } from '$app/navigation';
    import { Badge } from '$lib/components/ui/badge';
    import { displayPrice } from '$lib/utils/price';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import Button from '$lib/components/ui/button/button.svelte';
    import MultipleCombobox from '$lib/components/custom/MultipleCombobox.svelte';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';
    import { CreateProductSchema } from '$lib/models/product';
    import productService from '$lib/services/product';
    import InputFile from '$lib/components/custom/inputFile.svelte';
    let { data }: { data: PageData } = $props();
    const addVariant = () => {
        form.variants.push({
            idForm: Date.now(),
            name: '',
            color: '',
            size: '',
            price: 0,
            stock: 0,
            pictures: undefined
        });
    };
    const deleteVariant = (id: number) => {
        const index = form.variants.findIndex((v) => v.idForm === id);
        if (index !== -1) form.variants.splice(index, 1);
    };
    const form = $state({
        name: '',
        description: '',
        variants: [] as {
            idForm: number;
            name: string;
            color: string;
            size: string;
            price: number;
            stock: number;
            pictures: FileList | undefined;
        }[],
        categories: []
    });
    const resetVariants = () => (form.variants = []);
    const addProduct = async () => {
        const refinedForm = {
            ...form,
            categories: form.categories.map((c) => parseInt(c)),
            variants: form.variants.map((v) => {
                return { ...v, pictures: Array.from(v.pictures || []) };
            })
        };
        const parsedForm = await CreateProductSchema.parseAsync(refinedForm);
        await productService.createOne(parsedForm);
        invalidateAll();
    };
</script>

<div class="flex w-full flex-col items-center">
    <Dialog.Root
        onOpenChange={(isOpen) => {
            if (!isOpen) resetVariants();
        }}
    >
        <Dialog.Trigger
            class={'fixed bottom-10 right-10 rounded-xl bg-primary p-4 text-primary-foreground duration-200 hover:bg-primary-foreground hover:text-primary'}
            >Ajouter un produit</Dialog.Trigger
        >
        <Dialog.Content class="max-h-[80%] overflow-auto sm:max-w-[425px]">
            <Dialog.Header>
                <Dialog.Title>Ajouter un produit</Dialog.Title>
                <Dialog.Description>Ajoutez un produit au catalogue</Dialog.Description>
            </Dialog.Header>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name">Nom du produit</Label>
                    <Input id="name" class="col-span-3" bind:value={form.name} />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="description">Description</Label>
                    <Input id="description" class="col-span-3" bind:value={form.description} />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="categories">Catégories</Label>
                    <MultipleCombobox
                        bind:value={form.categories}
                        placeholder="Selectionner une catégorie"
                        options={[
                            ...data.categories.map((c) => {
                                return {
                                    label: c.name,
                                    value: c.id.toString()
                                };
                            })
                        ]}
                    ></MultipleCombobox>
                </div>
                {#each form.variants as variant (variant.idForm)}
                    <div
                        class="flex flex-col gap-4 rounded-md bg-muted p-4"
                        animate:flip={{ duration: 300 }}
                        transition:fade={{ duration: 200 }}
                    >
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name">Nom du variant</Label>
                            <Input id="name" class="col-span-3" bind:value={variant.name} />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="color">Couleur</Label>
                            <Input id="color" class="col-span-3" bind:value={variant.color} />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="size">Taille</Label>
                            <Input id="size" class="col-span-3" bind:value={variant.size} />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="price">Prix</Label>
                            <Input
                                id="price"
                                class="col-span-3"
                                bind:value={variant.price}
                                type="number"
                            />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="stock">Stock</Label>
                            <Input
                                id="stock"
                                class="col-span-3"
                                bind:value={variant.stock}
                                type="number"
                            />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="pictures">Images</Label>
                            <InputFile class="col-span-3" bind:files={variant.pictures} />
                            <!-- TODO: Faire un file input -->
                        </div>
                        <Button variant="destructive" onclick={() => deleteVariant(variant.idForm)}
                            >Supprimer le variant</Button
                        >
                    </div>
                {/each}
            </div>
            <Button onclick={addVariant}>Ajouter un variant</Button>
            <Dialog.Footer>
                <Button type="submit" onclick={addProduct}>Save changes</Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
    <h1 class="text-4xl">Gestion des produits</h1>
    <Table.Root>
        <Table.Header>
            <Table.Row>
                <Table.Head class="w-[200px]">Nom du produit</Table.Head>
                <Table.Head>Catégories</Table.Head>
                <Table.Head>Stock</Table.Head>
                <Table.Head class="text-right">A partir de</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each data.products.data as product (product.id)}
                <Table.Row
                    class="cursor-pointer"
                    onclick={async () => await goto(`/admin/product/${product.id}`)}
                >
                    <Table.Cell class="font-medium">
                        {product.name}
                    </Table.Cell>
                    <Table.Cell class="flex flex-row gap-4 font-medium">
                        {#each product.categories as category}
                            <Badge>{category.name}</Badge>
                        {/each}
                    </Table.Cell>
                    <Table.Cell class="font-medium">
                        {product.variants
                            .map((v) => v.stock)
                            .reduce((previousVal, currentVal) => previousVal + currentVal, 0)}
                    </Table.Cell>
                    <Table.Cell class="text-right font-medium">
                        {displayPrice(product.variants.sort((a, b) => a.price - b.price)[0].price)}
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
