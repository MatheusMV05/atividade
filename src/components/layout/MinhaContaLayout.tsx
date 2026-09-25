import { Outlet } from "react-router-dom"

import { MinhaContaSidebar } from "./MinhaContaSidebar"

export function MinhaContaLayout() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8 md:flex-row">
      <MinhaContaSidebar />
      <div className="mx-auto w-full max-w-[800px]">
        <Outlet />
      </div>
    </div>
  )
}
