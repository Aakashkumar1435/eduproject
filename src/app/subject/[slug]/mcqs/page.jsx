import MCQList from "@/components/subject/MCQList/MCQList";

export default function MCQPage({ params }) {
  const { slug } = params;

  return <MCQList subject={slug.charAt(0).toUpperCase() + slug.slice(1)} />;
}
