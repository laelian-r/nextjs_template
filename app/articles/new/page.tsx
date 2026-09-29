"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { requireAuth } from "@/hooks/requireAuth";

export default function NewArticlePage() {
	const { loading } = requireAuth(); // redirige vers /login si pas connecté
	const router = useRouter();
	const [form, setForm] = useState({ title: "", content: "" }); // valeurs du formulaire
	const [errors, setErrors] = useState({}); // erreurs de validation

	const handleSubmit = async (e) => {
		e.preventDefault(); // évite le rechargement de la page
		try {
			const res = await api.post("/articles", form); // Laravel lie l'article à l'utilisateur du token
			router.push(`/articles/${res.data.id}`); // va sur l'article créé
		} catch (err) {
			// 422 = validation échouée (titre vide, contenu trop long...)
			if (err.response?.status === 422) setErrors(err.response.data.errors);
		}
	};

	if (loading)
		return (
			<main className="flex h-screen items-center justify-center">
				<p className="text-2xl font-bold">Chargement...</p>
			</main>
		);

	return (
		<main className="flex flex-col gap-2 p-4">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-gray-200 p-4 rounded gap-2"
			>
				{/* à chaque frappe : on copie form et on remplace seulement title */}
				<input
					placeholder="Titre"
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{/* affiche le 1er message d'erreur du champ, s'il y en a */}
				{errors.title && <p>{errors.title[0]}</p>}

				<textarea
					placeholder="Contenu"
					onChange={(e) => setForm({ ...form, content: e.target.value })}
					className="rounded p-2 bg-white"
				/>
				{errors.content && <p>{errors.content[0]}</p>}

				<button type="submit" className="bg-blue-500 text-white rounded p-2">
					Publier
				</button>
			</form>
		</main>
	);
}
