import React from "react";

interface Props {
  params: { id: number };
}

// Dynamic rendering: only works in page.tsx

const UserDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  return <div>UserDetailPage{id}</div>;
};

export default UserDetailPage;
