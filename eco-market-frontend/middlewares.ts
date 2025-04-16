import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // Jika pengguna mencoba mengakses halaman root, arahkan ke login
  if (request.nextUrl.pathname === "/") {
    const redirectAdmin = request.nextUrl.clone();
    redirectAdmin.pathname = "/login";
    return NextResponse.redirect(redirectAdmin);
  }
  // Cek apakah pengguna mencoba mengakses halaman admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Jika tidak ada token atau role, arahkan ke halaman login
    if (!token || !role) {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }
    // Jika role bukan admin, arahkan ke halaman login
    if (role !== "ADMIN") {
      const redirectAdmin = request.nextUrl.clone();
      redirectAdmin.pathname = "/login";
      return NextResponse.redirect(redirectAdmin);
    }
    // Jika semua cek berhasil, lanjutkan ke halaman yang diminta
    return NextResponse.next();
  }
  // Untuk semua halaman lainnya, lanjutkan tanpa perubahan
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin/:path*", // Menangkap semua rute di bawah admin
    "/", // Menangkap rute root
  ],
};
