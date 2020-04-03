import fetch from "isomorphic-unfetch";

export async function fetchQuery(query: string) {
  return await fetch(
    process.env.BACKEND_GRAPHQL || "http://localhost:1337/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
    }
  );
}