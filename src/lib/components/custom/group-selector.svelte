<script lang="ts">
	import Button from '../ui/button/button.svelte';

	type Props = {
		options: { label: string; value: string; disabled?: boolean }[];
		onClick?: (val: string) => void;
		selected?: string;
	};
	let { options, onClick, selected = $bindable(options[0].value) }: Props = $props();
</script>

<div class="flex flex-row gap-1 rounded-lg bg-muted p-1 text-muted-foreground">
	{#each options as option (option.value)}
		<Button
			data-selected={selected === option.value}
			class={`group data-[selected=true]:bg-background data-[selected=true]:text-foreground`}
			onclick={() => {
				if (selected !== option.value) {
					selected = option.value;
					if (onClick) onClick(option.value);
				}
			}}
			variant="ghost"
			disabled={option.disabled}
		>
			<p class={`duration-300 group-hover:text-foreground`}>{option.label}</p>
		</Button>
	{/each}
</div>
