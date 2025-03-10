import { notFound } from "next/navigation";
import Default from "./default";

function page({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams: {
    type?: string;
  };
}) {
  const type = searchParams?.type || "posts";
  const slug = params?.slug;
  if (!slug) {
    notFound();
  }

  return <Default type={type} community={slug} />;
}

export default page;
