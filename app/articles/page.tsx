"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { Header } from "@/app/ui/Header";

export default function Home() {
	const { user, loading: authLoading } = useAuth(); // utilisateur connecté (ou null)
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true); // chargement de la liste

	// Charge les articles une seule fois (route publique, pas besoin de token)
	useEffect(() => {
		api
			.get("/articles")
			.then((res) => setArticles(res.data))
			.finally(() => setLoading(false));
	}, []);

	// Tant que ça charge, on affiche seulement ce message
	if (loading)
		return (
			<main className="flex h-screen items-center justify-center">
				<p className="text-2xl font-bold">Chargement...</p>
			</main>
		);

	return (
		<>
			<Header />

			<main>
				<section className="flex flex-wrap gap-4 p-4">
					{articles.map((article: any) => {
						// vrai si l'article appartient à l'utilisateur connecté
						const isOwner = user && article.user_id === user.id;

						return (
							// key obligatoire dans une liste
							<article
								key={article.id}
								className="flex flex-col bg-gray-200 p-4 rounded w-2/6"
							>
								<div className="flex justify-between">
									<h2 className="text-xl font-bold">{article.title}</h2>
									{/* badge visible seulement pour mes articles */}
									{isOwner && (
										<span className="bg-gray-400 text-white p-1 rounded">
											Vous
										</span>
									)}
								</div>

								{/* nom de l'auteur, fourni par with('user') côté Laravel */}
								<p>{article.user.name}</p>

								<div className="mt-4 flex justify-between gap-2">
									<Link
										href={`/articles/${article.id}`}
										className="bg-blue-500 text-center text-white p-2 rounded w-full flex items-center justify-center"
									>
										Voir
									</Link>
								</div>
							</article>
						);
					})}
				</section>
			</main>
		</>
	);
}
