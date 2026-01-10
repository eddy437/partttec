export default function FooterEditor() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Footer Information</h1>
        <p className="text-muted-foreground mt-2">
          Manage the contact information and links displayed in the site footer.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Company Info Section */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Company Information</h2>

          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <input
                type="text"
                defaultValue="AUTOPARTS"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                defaultValue="Your trusted source for quality used auto parts. Instant search across thousands of engines, transmissions, and more."
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="text"
                defaultValue="1-800-AUTO-PARTS"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                defaultValue="supports@allusedautoparts.world"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                defaultValue="Nationwide Service"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Social Media</h2>

          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Facebook URL</label>
              <input
                type="url"
                placeholder="https://facebook.com/yourpage"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Twitter URL</label>
              <input
                type="url"
                placeholder="https://twitter.com/yourhandle"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Instagram URL</label>
              <input
                type="url"
                placeholder="https://instagram.com/yourpage"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">YouTube URL</label>
              <input
                type="url"
                placeholder="https://youtube.com/yourchannel"
                className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Copyright Text</h2>

          <div>
            <label className="text-sm font-medium">Footer Copyright Message</label>
            <input
              type="text"
              defaultValue="AUTOPARTS. All rights reserved. | Quality Used Auto Parts Nationwide"
              className="w-full mt-1.5 px-3 py-2 bg-background border rounded-md"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 border rounded-md hover:bg-accent transition-colors">Discard Changes</button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Save Footer Info
          </button>
        </div>
      </div>
    </div>
  )
}
