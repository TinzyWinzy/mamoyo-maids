export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-gold border-t-transparent" />
        <p className="text-sm text-text-secondary font-medium">Loading...</p>
      </div>
    </div>
  );
}
