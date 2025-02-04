<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
    type Props = {
        name: string;
        description: string;
        image: string;
        url: string;
        price: string;
        categories: string[];
    };
    import { AspectRatio } from '$lib/components/ui/aspect-ratio';
    import { Badge } from '$lib/components/ui/badge/index.js';
    import { env } from '$env/dynamic/public';
    import { getPictureUrl } from '$lib/utils/picture';
    const { name, description, image, url, price, categories }: Props = $props();
</script>

<a href={url}>
    <Card.Root class="group w-[350px]">
        <Card.Header>
            <Card.Title>{name}</Card.Title>
        </Card.Header>
        <Card.Content>
            <AspectRatio ratio={16 / 9} class="overflow-hidden rounded-md">
                <img
                    src={getPictureUrl(image)}
                    alt=""
                    class="h-full w-full rounded-md duration-500 group-hover:scale-105"
                />
            </AspectRatio>
            <p class="text-xl font-bold">{price}</p>
            <div class="flex flex-row flex-wrap gap-2">
                {#each categories as category}
                    <Badge>{category}</Badge>
                {/each}
            </div>
        </Card.Content>
        <Card.Footer>
            <Card.Description>{description}</Card.Description>
        </Card.Footer>
    </Card.Root>
</a>
