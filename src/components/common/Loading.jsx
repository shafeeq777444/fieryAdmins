// components/Loading.jsx
export default function Loading() {
  return (
    <div className=" fixed inset-0 flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}
