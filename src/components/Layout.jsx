import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomTabBar from './BottomTabBar'

function Layout() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Fixed Top Header with 45px padding for Android status bar */}
      <Header />
      
      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto scrollable-content pt-[109px] pb-20">
        <Outlet />
      </main>
      
      {/* Fixed Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  )
}

export default Layout
