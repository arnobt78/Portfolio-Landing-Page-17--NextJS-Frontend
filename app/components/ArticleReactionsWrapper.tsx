import { getArticleReactions, getUserReactions } from "../db/actions";
import ArticleReactions from "./ArticleReactions";

/** Server wrapper: fetches reaction counts and user's reactions (cookie), passes to client ArticleReactions. */
export default async function ArticleReactionWrapper({
  slug,
}: {
  slug: string;
}) {
  // Fetch initial data
  const initialReactions = await getArticleReactions(slug);
  const initialUserReactions = await getUserReactions(slug);

  return (
    <ArticleReactions
      slug={slug}
      initialReactions={initialReactions}
      initialUserReactions={initialUserReactions}
    />
  );
}
