"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { Header } from "@/app/ui/Header";

export default function ArticlePage() {
	const { user, loading: authLoading } = useAuth();
	const { id } = useParams(); // id lu dans l'URL (/articles/12 → "12")
	const router = useRouter();
	const [article, setArticle] = useState(null); // null tant qu'il n'est pas chargé
	const [loading, setLoading] = useState(true);

	// Charge l'article (et recharge si l'id change)
	useEffect(() => {
		api
			.get(`/articles/${id}`)
			.then((res) => setArticle(res.data))
			.finally(() => setLoading(false));
	}, [id]);

	// Supprime l'article puis retourne à la liste
	const handleDelete = async () => {
		if (!confirm("Supprimer cet article ?")) return; // l'utilisateur peut annuler
		await api.delete(`/articles/${id}`); // Laravel vérifie que c'est bien l'auteur
		router.push("/articles");
	};

	if (loading)
		return (
			<main className="flex h-screen items-center justify-center">
				<p className="text-2xl font-bold">Chargement...</p>
			</main>
		);

	// chargement fini mais pas d'article : il n'existe pas (404)
	if (!article) return <p>Article introuvable.</p>;

	// ici article n'est jamais null
	const isOwner = user && article.user_id === user.id;

	return (
		<>
			<Header />

			<main className="flex flex-col bg-gray-200 p-4 rounded mx-4">
				<h1 className="text-2xl font-bold text-blue-500">{article.title}</h1>
				<p>{article.content}</p>
				<p className="text-blue-500 mt-4 text-">{article.user.name}</p>

				{/* boutons visibles seulement pour l'auteur (la vraie sécurité est côté Laravel) */}
				{isOwner && (
					<div className="flex gap-2 mt-4">
						<Link
							href={`/articles/${id}/edit`}
							className="p-2 bg-green-500 text-white rounded"
						>
							Modifier
						</Link>
						<button
							onClick={handleDelete}
							className="p-2 bg-red-500 text-white rounded"
						>
							Supprimer
						</button>
					</div>
				)}
			</main>
		</>
	);
}
