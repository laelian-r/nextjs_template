"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth";

function ResetForm() {
	const params = useSearchParams(); // lit ?token=...&email=... dans l'URL
	const router = useRouter();
	const { resetPassword, errors } = useAuth();
	const [form, setForm] = useState({ password: "", password_confirmation: "" });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ok = await resetPassword({
			token: params.get("token"), // vient du lien de l'email
			email: params.get("email"),
			...form, // password + password_confirmation
		});
		if (ok) router.push("/login"); // succès : direction connexion
	};

	return (
		<main className="flex flex-col gap-2 p-4">
			<form onSubmit={handleSubmit} className="flex flex-col bg-gray-200 p-4 rounded gap-2">
				<input
					type="password"
					placeholder="Nouveau mot de passe"
					onChange={(e) => setForm({ ...form, password: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{errors.password && <p>{errors.password[0]}</p>}

				<input
					type="password"
					placeholder="Confirmation"
					onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{/* erreur "lien invalide ou expiré" */}
				{errors.token && <p>{errors.token[0]}</p>}

				<button type="submit" className="bg-blue-500 text-white rounded p-2">
					Réinitialiser
				</button>
			</form>
		</main>
	);
}

// useSearchParams doit être dans un <Suspense>, sinon "next build" échoue
export default function ResetPasswordPage() {
	return (
		<Suspense>
			<ResetForm />
		</Suspense>
	);
}