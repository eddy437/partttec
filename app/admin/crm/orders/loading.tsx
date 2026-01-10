export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#8892b0]">Loading Orders CRM...</p>
      </div>
    </div>
  )
}
