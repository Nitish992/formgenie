// app/form/[slug]/page.tsx
import FormPage from "@/components/FormPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params; // Await params to get the slug
    return <FormPage slug={slug} />;
}
// import FormPage from "@/components/FormPage";
// import { useParams } from 'next/navigation';

// export default async function Page({ params }: { params: { slug: string } }) {

//     return <FormPage slug={params.slug} />;
// }
