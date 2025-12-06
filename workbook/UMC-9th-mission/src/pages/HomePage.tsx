import { useOutletContext } from 'react-router-dom';
import Finding from '../components/Finding';
export default function HomePage() {
  const { searchTerm } = useOutletContext<{ searchTerm: string }>();

  return <Finding searchTerm={searchTerm} />;
}
