import FormPage from "@/components/FormPage";
import SubmitFormPage from "@/components/SubmitFormPage";
import { useParams } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <SubmitFormPage slug={slug} />;
}