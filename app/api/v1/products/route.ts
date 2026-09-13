import dbConnect from "@/lib/mongodb";
import { Product } from "@/models/product";
import { StandarApiResponseV1 } from "@/types/apiRespnse/ApiResponse";
import { internalServerIssue, resultantResponse } from "@/utils/httpResponses";
import { NextRequest } from "next/server";

interface FiltersOfQuery {
  query?: string;
  limit?: number;
  page?: number;
}

const PRODUCT_SELECT_FIELDS = "_id title descriptions banner productImages type filter status websiteUrl playstoreUrl appStoreUrl npmPackageUrl forwards gitHubUrl liveDate currentProductVisitors";

function buildProductSearchFilter(query?: string) {
  const normalizedQuery = query?.trim();

  if (!normalizedQuery) return {};

  const searchRegex = { $regex: normalizedQuery, $options: "i" };

  return {
    $or: [
      { title: searchRegex },
      { "descriptions.title": searchRegex },
      { "descriptions.content": searchRegex },
    ],
  };
}

export async function GET(req: NextRequest): Promise<StandarApiResponseV1<unknown>> {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("query") ?? "";
    const limit = Math.max(1, Number(searchParams.get("limit") ?? 20));
    const page = Math.max(0, Number(searchParams.get("page") ?? 0));

    if (!(await dbConnect())) {
      return internalServerIssue({
        errorMessage: "Database connection failed!",
      });
    }

    const filters: FiltersOfQuery = {
      query: rawQuery,
      limit,
      page,
    };

    const mongoFilter = buildProductSearchFilter(filters.query);
    const skip = filters.page ?? 0;
    const totalCount = await Product.countDocuments(mongoFilter);
    const fetchedProducts = await Product.find(mongoFilter)
      .skip((skip ?? 0) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean()
      .select(PRODUCT_SELECT_FIELDS);

    return resultantResponse({
      data: {
        products: fetchedProducts,
        page: filters.page ?? 0,
        limit,
        total: totalCount,
      },
    });
  } catch (error) {
    console.log((error as Error).message);
    return internalServerIssue({
      errorMessage: (error as Error)?.message || "Internal server issue!",
    });
  }
}

export async function QUERY(req: NextRequest): Promise<StandarApiResponseV1<unknown>> {
  return GET(req);
}

export async function POST(req: NextRequest): Promise<StandarApiResponseV1<unknown>> {
  return GET(req);
}