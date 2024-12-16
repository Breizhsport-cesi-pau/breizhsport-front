<script lang="ts">
	type Props = {
		options: { label: string; value: string }[];
		onClick: (val: string) => void;
		selected?: string;
	};
	let { options, onClick, selected = $bindable(options[0].value) }: Props = $props();
</script>

<div class="flex flex-row gap-1 rounded-lg bg-muted p-1 text-muted-foreground">
	{#each options as option (option.value)}
		<div
			data-selected={selected === option.value}
			class={`group flex cursor-pointer items-center justify-center rounded-lg pb-1 pl-2 pr-2 pt-1 duration-100 data-[selected=true]:bg-background data-[selected=true]:text-foreground`}
			onclick={() => {
				if (selected !== option.value) {
					selected = option.value;
					onClick(option.value);
				}
			}}
		>
			<p class={`duration-300 group-hover:text-foreground`}>{option.label}</p>
		</div>
	{/each}
</div>
