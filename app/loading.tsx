import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-8">
      <Loader className="animate-spin" />
    </div>
  );
}
