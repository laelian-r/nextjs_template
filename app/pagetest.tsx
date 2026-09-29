import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	// 1. Fetch de l'api Laravel
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
	);

	const articles = await response.json();

	return (
		<main>
			<h1>Mon blog</h1>

			<section>
				{/* 2. On parcours le tableau article */}
				{articles.map((article: any) => (
					<article
						// 3. On récupère un article avec son id
						key={article.id}
						className="flex flex-col bg-gray-200 w-1/6 p-4 rounded"
					>
						{/* 4. On affiche le contenu de cet article */}
						<h2 className="text-2xl">{article.title}</h2>
						<p>{article.user.name}</p>

						<div className="mt-4 flex justify-between gap-2">
							{/*
                5. On créer un lien avec l'id de l'article séléctionné pour afficher son contenu
                Structure du dossier :
                app/article/[id]/page.tsx
              */}
							<Link
								href={`/articles/${article.id}`}
								className="bg-blue-500 text-center text-white p-2 rounded w-full flex items-center justify-center"
							>
								Voir
							</Link>

							{/* <Link
								href={`/`}
								className="bg-red-500 text-center text-white p-2 rounded w-full flex items-center justify-center"
							>
								Supprimer
							</Link> */}
						</div>
					</article>
				))}
			</section>
		</main>
	);
}
