<script lang="ts">
	import Button from '../ui/button/button.svelte';

	type Props = {
		max?: number;
		min?: number;
		number?: number;
	};
	let { max = 99, min = 1, number = $bindable(1) }: Props = $props();
	const increment = () => {
		if (number + 1 >= max) return (number = max);
		number += 1;
	};
	const decrement = () => {
		if (number - 1 <= min) return (number = min);
		number -= 1;
	};
</script>

<div class="flex flex-row items-center justify-between gap-4 rounded-md bg-sidebar-accent p-2">
	<Button onclick={decrement} size="icon" variant="outline" disabled={number <= min}>-</Button>
	<p class=" flex-1 text-center">{number}</p>
	<Button onclick={increment} size="icon" disabled={number >= max}>+</Button>
</div>
