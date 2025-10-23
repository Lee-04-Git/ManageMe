import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import StatsCards from "@/components/StatsCards"
import ProjectStats from "@/components/ProjectStats"
import Calendar from "@/components/Calendar"
import TopClients from "@/components/TopClients"
import CurrentProjects from "@/components/CurrentProjects"
import TeamActivity from "@/components/TeamActivity"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <Header />
        <StatsCards />
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-1">
            <ProjectStats />
          </div>
          <div className="col-span-1">
            <Calendar />
          </div>
          <div className="col-span-1">
            <TopClients />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <CurrentProjects />
          </div>
          <div className="col-span-1">
            <TeamActivity />
          </div>
        </div>
      </main>
    </div>
  )
}