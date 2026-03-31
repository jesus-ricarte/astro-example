import { getSecret } from "astro:env/server";
import { Flotiq } from "@flotiq/flotiq-api-sdk";
import type { Product } from "@flotiq/flotiq-api-sdk";

const PAGE_SIZE = 100;

/** Fetches every product object from Flotiq (all pages). */
export async function getAllFlotiqProducts(): Promise<Product[]> {
  const apiKey = getSecret("FLOTIQ_API_KEY");
  if (!apiKey) {
    throw new Error(
      "FLOTIQ_API_KEY is missing; set it in the environment (e.g. .env locally, Netlify env for deploy).",
    );
  }

  const api = new Flotiq({ apiKey });
  const all: Product[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await api.content.product.list({
      limit: PAGE_SIZE,
      page,
      orderBy: "price[*].minor_unit",
      orderDirection: "asc",
    });
    all.push(...response.data);
    totalPages = response.total_pages;
    page += 1;
  } while (page <= totalPages);

  return all;
}
