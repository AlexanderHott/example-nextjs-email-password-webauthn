import { LoginForm } from "./components";
import Link from "next/link";

import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { get2FARedirect } from "@/lib/server/2fa";

export default function Page() {
	const { session, user } = getCurrentSession();
	if (session !== null) {
		if (!user.emailVerified) {
			return redirect("/verify-email");
		}
		if (!user.registered2FA) {
			return redirect("/2fa/setup");
		}
		if (!session.twoFactorVerified) {
			return redirect(get2FARedirect(user));
		}
		return redirect("/");
	}
	return (
		<>
			<h1>Sign in</h1>
			<LoginForm />
			<Link href="/signup">Create an account</Link>
			<Link href="/forgot-password">Forgot password?</Link>
		</>
	);
}