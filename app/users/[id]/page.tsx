import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

// Dynamic rendering: only works in page.tsx

const UserDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const newId = parseInt(id);
  if (isNaN(newId) || newId > 10) notFound();
  return <div>UserDetailPage with user id: {id}</div>;
};

export default UserDetailPage;
