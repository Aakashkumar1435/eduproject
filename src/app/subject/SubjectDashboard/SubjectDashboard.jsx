import SearchBar from "@/components/subject/SearchBar/SearchBar";
import StudyCategories from "@/components/subject/StudyCategories/StudyCategories";
import ProgressCards from "@/components/subject/ProgressCards/ProgressCards";
import RecentActivity from "@/components/subject/RecentActivity/RecentActivity";


export default function SubjectDashboard({ subject }) {
  return (
    <div>
      <SearchBar />
      <ProgressCards />
      <StudyCategories />
      <RecentActivity />
    </div>
  );
}
