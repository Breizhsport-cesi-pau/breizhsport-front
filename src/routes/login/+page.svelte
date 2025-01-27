<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import LoginForm from '$lib/components/forms/LoginForm.svelte';
	import { toast } from 'svelte-sonner';
	import UserService from '$lib/services/user';
	import { loginInformationStore } from '$lib/stores/login-informations.store';
	import { goto } from '$app/navigation';
	const { data } = $props();
	const login = async (formData: { email: string; password: string }) => {
		const res = await UserService.login(formData.email, formData.password);
		if (res.isLogged) {
			toast.success('Vous vous êtes connecté avec succès !');
			loginInformationStore.set(res);
			return await goto('/');
		}
		toast.error('Email ou mot de passe incorrect.');
	};
</script>

<div class="flex h-full items-center justify-center">
	<Tabs.Root value="login" class="w-[400px]">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="login">Se connecter</Tabs.Trigger>
			<Tabs.Trigger value="signup">S'inscrire</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="login">
			<Card.Root>
				<Card.Header>
					<Card.Title>Se connecter</Card.Title>
					<Card.Description>Vous avez déjà un compte chez nous ? C'est par ici.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<LoginForm data={data.form} onClick={async (e, formData) => await login(formData)}
					></LoginForm>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="signup">
			<Card.Root>
				<Card.Header>
					<Card.Title>S'inscrire</Card.Title>
					<Card.Description>Vous êtes nouveau chez nous ? Ca se passe là.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="space-y-1">
						<Label for="firstname">Prénom</Label>
						<Input id="firstname" required placeholder="Prénom" />
					</div>
					<div class="space-y-1">
						<Label for="lastname">Nom</Label>
						<Input id="lastname" required placeholder="Nom" />
					</div>
					<div class="space-y-1">
						<Label for="email">Email</Label>
						<Input id="email" required placeholder="Email" type="email" />
					</div>
					<div class="space-y-1">
						<Label for="phone_number">Numéro de téléphone</Label>
						<Input id="phone_number" required placeholder="0X XX XX XX XX" type="tel" />
					</div>
					<div class="space-y-1">
						<Label for="password">Mot de passe</Label>
						<Input id="password" required placeholder="Mot de passe" type="password" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button type="submit">S'inscrire</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
