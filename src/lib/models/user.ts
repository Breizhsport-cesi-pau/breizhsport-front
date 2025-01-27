import { z } from 'zod';

const UserSchema = z.object({
	id: z.string().uuid(),
	firstname: z.string({ required_error: 'Ce champs est requis.' }),
	lastname: z.string({ required_error: 'Ce champs est requis.' }),
	password: z
		.string({ required_error: 'Ce champs est requis.' })
		.min(8, { message: 'Le mot de passe doit au minimum faire 8 caractères.' })
		.regex(new RegExp(/^(?=.*?[A-Z]).{1,}$/), {
			message: 'Le mot de passe doit contenir au minimum une lettre majuscule.'
		})
		.regex(/^(?=.*?[a-z]).{1,}$/, {
			message: 'Le mot de passe doit contenir au minimum une lettre minuscule.'
		})
		.regex(/^(?=.*?[0-9]).{1,}$/, {
			message: 'Le mot de passe doit contenir au minimum un chiffre.'
		})
		.regex(/^(?=.*?[#?!@$%^&*-]).{1,}$/, {
			message: 'Le mot de passe doit contenir au minimum un caractère spécial.'
		}),
	email: z
		.string({ required_error: 'Ce champs est requis.' })
		.email({ message: 'Veuillez entrer une adresse mail valide.' }),
	phone_number: z
		.string({ required_error: 'Ce champs est requis.' })
		.regex(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/, {
			message: 'Veuillez entrer un numéro de téléphone valide.'
		})
});

export type User = z.infer<typeof UserSchema>;

export default UserSchema;
