import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Only allow access to /main if user is logged in
      const path = req.nextUrl.pathname
      if (path.startsWith("/main")) {
        return !!token
      }
      return true
    },
  },
})

export const config = {
  matcher: ["/main/:path*"]
}