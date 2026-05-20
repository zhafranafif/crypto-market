import DashboardClient from "@/component/DashboardClient";
import { TABS } from "@/variables";

export default function Dashboard() {
    return (
        <DashboardClient
            tabs={TABS}
        />
    )
} 

