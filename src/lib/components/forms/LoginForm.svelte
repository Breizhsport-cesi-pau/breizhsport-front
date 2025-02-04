<script lang="ts">
    import * as Form from '$lib/components/ui/form';
    import { Input } from '$lib/components/ui/input';
    import UserSchema from '$lib/models/user';
    import type { MaybeAsync } from '$lib/services/service';
    import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    const loginSchema = UserSchema.pick({ password: true, email: true });
    type LoginSchema = typeof loginSchema;
    type Props = {
        onClick: (
            e:
                | (MouseEvent & {
                      currentTarget: EventTarget & HTMLButtonElement;
                  })
                | (MouseEvent & {
                      currentTarget: EventTarget & HTMLAnchorElement;
                  }),
            formData: {
                password: string;
                email: string;
            }
        ) => MaybeAsync<void>;
        data: SuperValidated<Infer<LoginSchema>>;
    };
    const { data, onClick }: Props = $props();
    const form = superForm(data, {
        validators: zodClient(loginSchema)
    });
    const { form: formData, enhance } = form;
</script>

<form use:enhance method="POST">
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Mot de passe</Form.Label>
            <Input {...attrs} bind:value={$formData.password} type="password" />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button
        type="button"
        onclick={async (e) => {
            e.preventDefault();
            await onClick(e, $formData);
        }}>Se connecter</Form.Button
    >
</form>
