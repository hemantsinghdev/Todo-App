import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BootstrapApp from "@/components/BootstrapApp";
import { getAllTasks } from "@/services/mongoDB/taskServices";

export default async function Page() {
  const cookieStore = await cookies();
  const isSynced = cookieStore.get("isSynced");

  if (isSynced) {
    redirect("/tasks");
  }

  const tasks = await getAllTasks();
  return <BootstrapApp tasks={tasks} />;
}
