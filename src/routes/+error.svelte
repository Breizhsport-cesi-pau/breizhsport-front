<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex w-full flex-col items-center gap-40 pt-10">
	<h1 class="text-7xl">{$page.status}</h1>
	<h2 class="text-5xl">{$page.error?.message}</h2>
</div>
