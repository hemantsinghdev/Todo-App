import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BootstrapApp from "@/components/BootstrapApp";
import { getAllTasks } from "@/services/mongoDB/taskServices";
import { getAllLabels } from "@/services/mongoDB/labelServices";

export default async function Page() {
  const cookieStore = await cookies();
  const isSynced = cookieStore.get("isSynced");

  if (isSynced) {
    redirect("/today");
  }

  const tasks = await getAllTasks();
  const labels = await getAllLabels();
  return <BootstrapApp tasks={tasks} labels={labels}/>;
}
