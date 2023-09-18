import {Outlet} from "@remix-run/react";

// shared layout for auth workflow without adding any path segments to the URL.
export default function AuthLayout() {
  return (
    <div className="h-full">
      <div className="text-5xl text-cyan-500 flex justify-center pt-8">Shared Auth Layout</div>
      <Outlet />
    </div>
  );
}
