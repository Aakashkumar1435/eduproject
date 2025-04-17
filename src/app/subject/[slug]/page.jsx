import SubjectDashboard from "../SubjectDashboard/SubjectDashboard";

export default function SubjectPage({ params }) {
  const { slug } = params;

  return <SubjectDashboard subject={slug} />;
}

