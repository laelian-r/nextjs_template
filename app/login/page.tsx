"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";

export default function Login() {
	const { login, errors } = useAuth();
	const router = useRouter();
	const [form, setForm] = useState({ email: "", password: "" });
	const [remember, setRemember] = useState(false); // décochée par défaut

	const handleSubmit = async (e) => {
		e.preventDefault();
		const ok = await login(form, remember);
		if (ok) router.push("/articles");
	};

	return (
		<main className="flex flex-col gap-2 p-4">
			<h1>Connexion</h1>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-gray-200 p-4 rounded gap-2"
			>
				<input
					placeholder="Email"
					onChange={(e) => setForm({ ...form, email: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					onChange={(e) => setForm({ ...form, password: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{errors.credentials && <p>{errors.credentials[0]}</p>}

				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={remember}
						onChange={(e) => setRemember(e.target.checked)}
					/>
					Se souvenir de moi
				</label>

				<Link href="/forgot-password" className="text-blue-500 underline">
					Mot de passe oublié ?
				</Link>

				<button type="submit" className="bg-blue-500 text-white rounded p-2">
					Se connecter
				</button>
			</form>
		</main>
	);
}
