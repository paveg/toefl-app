
import { useSession } from "next-auth/react";
import { WordContainer } from "~/components/words/container";
import { Layout } from "~/layouts";

export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <Layout>
      <WordContainer user={sessionData?.user} />
    </Layout>
  );
}
