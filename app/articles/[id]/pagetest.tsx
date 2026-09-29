import Image from "next/image";
import Link from "next/link";

/*
 * params est un objet fourni automatiquement par Next.js.
 * Il contient les valeurs dynamiques présentes dans l'URL.
 * Par exemple le dossier [id] signifie que cette partie de l'URL peut changer, donc ces URLs correspondent toutes à la même page :
 * /articles/1
 * /articles/2
 * /articles/15
 * /articles/428
 * Mais l'id change.
 * Next.js récupère cette partie variable et la met dans params.
 *
 * Exemple :
 * Imaginons que l'utilisateur visite http://localhost:3000/articles/42
 * Next.js regarde la structure :
 * app/
 * └── articles/
 *     └── [id]/
 *         └── page.tsx
 *
 * Il comprend :
 * articles/ → partie fixe
 * [id]/     → partie dynamique
 * Il récupère donc 42 et construit automatiquement :
 * params = {
 *     id: "42"
 * }
 */

export default async function ArticlePage({
	/*
	 * 1. On récupère les paramètres dynamiques de l'URL
	 */
	params,
}: {
	/*
	 * 2. On indique que params contient un objet avec un id de type string
	 */
	params: Promise<{ id: string }>;
}) {
	/*
	 * 3. On récupère l'id présent dans l'URL
	 *
	 * Si l'utilisateur va sur :
	 * /articles/42
	 *
	 * Next.js fournit :
	 * params = {
	 *     id: "42"
	 * }
	 *
	 * await permet d'attendre la récupération de params.
	 */
	const { id } = await params;

	/*
	 * 4. On fait une requête GET vers l'API Laravel
	 *
	 * L'URL devient par exemple :
	 * http://127.0.0.1:8000/api/articles/42
	 *
	 * On utilise l'id récupéré précédemment pour demander
	 * précisément l'article correspondant.
	 */
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
	);

	/*
	 * 5. On transforme la réponse JSON de Laravel
	 * en objet JavaScript utilisable par Next.js
	 */
	const article = await response.json();

	return (
		/*
		 * On affiche les informations concèrnant l'id
		 */
		<main>
			<h1 className="text-2xl font-bold">{article.title}</h1>
			<p>{article.content}</p>
			<p className="text-gray-600 mt-4 text-">{article.user.name}</p>
		</main>
	);
}
