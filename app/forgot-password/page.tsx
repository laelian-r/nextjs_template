"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/auth";

export default function ForgotPasswordPage() {
	const { forgotPassword, errors } = useAuth();
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false); // true = message de confirmation affiché

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ok = await forgotPassword(email);
		if (ok) setSent(true);
	};

	// Après l'envoi, on remplace le formulaire par un message
	if (sent)
		return <p className="p-4">Un lien viens de vous être envoyé.</p>;

	return (
		<main className="flex flex-col gap-2 p-4">
			<form onSubmit={handleSubmit} className="flex flex-col bg-gray-200 p-4 rounded gap-2">
				<input
					type="email"
					placeholder="Votre email"
					onChange={(e) => setEmail(e.target.value)}
					className="rounded p-2 bg-white"
				/>
				{errors.email && <p>{errors.email[0]}</p>}

				<button type="submit" className="bg-blue-500 text-white rounded p-2">
					Envoyer le lien
				</button>
			</form>
		</main>
	);
}