"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

export default function Register() {
	const { register, errors } = useAuth();
	const router = useRouter();
	const [form, setForm] = useState({ name: "", email: "", password: "" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const ok = await register(form);
		if (ok) router.push("/articles");
	};

	return (
		<main className="flex flex-col gap-2 p-4">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-gray-200 p-4 rounded gap-2"
			>
				<input
					placeholder="Nom"
					onChange={(e) => setForm({ ...form, name: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{errors.name && <p>{errors.name[0]}</p>}

				<input
					placeholder="Email"
					onChange={(e) => setForm({ ...form, email: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{errors.email && <p>{errors.email[0]}</p>}

				<input
					type="password"
					placeholder="Mot de passe"
					onChange={(e) => setForm({ ...form, password: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{errors.password && <p>{errors.password[0]}</p>}

				<button type="submit" className="bg-blue-500 text-white rounded p-2">
					S'inscrire
				</button>
			</form>
		</main>
	);
}
