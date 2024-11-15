"use client";

import { useState } from "react";
import {
	deletePasskeyAction,
	deleteSecurityKeyAction,
	disconnectTOTPAction,
	regenerateRecoveryCodeAction,
	updateEmailAction,
	updatePasswordAction
} from "./actions";
import { useFormState } from "react-dom";

const initialUpdatePasswordState = {
	message: ""
};

export function UpdatePasswordForm() {
	const [state, action] = useFormState(updatePasswordAction, initialUpdatePasswordState);

	return (
		<form action={action}>
			<label htmlFor="form-password.password">Current password</label>
			<input type="password" id="form-email.password" name="password" autoComplete="current-password" required />
			<br />
			<label htmlFor="form-password.new-password">New password</label>
			<input type="password" id="form-password.new-password" name="new_password" autoComplete="new-password" required />
			<br />
			<button>Update</button>
			<p>{state.message}</p>
		</form>
	);
}

const initialUpdateFormState = {
	message: ""
};

export function UpdateEmailForm() {
	const [state, action] = useFormState(updateEmailAction, initialUpdateFormState);

	return (
		<form action={action}>
			<label htmlFor="form-email.email">New email</label>
			<input type="email" id="form-email.email" name="email" required />
			<br />
			<button>Update</button>
			<p>{state.message}</p>
		</form>
	);
}

const initialDisconnectTOTPState = {
	message: ""
};

export function DisconnectTOTPButton() {
	const [state, formAction] = useFormState(disconnectTOTPAction, initialDisconnectTOTPState);
	return (
		<form action={formAction}>
			<button>Disconnect</button>
			<p>{state.message}</p>
		</form>
	);
}

const initialPasskeyState = {
	message: ""
};

export function PasskeyCredentialListItem(props: { encodedId: string; name: string }) {
	const [state, formAction] = useFormState(deletePasskeyAction, initialPasskeyState);
	return (
		<li>
			<p>{props.name}</p>
			<form action={formAction}>
				<input type="hidden" name="credential_id" value={props.encodedId} readOnly />
				<button> Delete </button>
				<p>{state.message}</p>
			</form>
		</li>
	);
}

const initialSecurityKeyState = {
	message: ""
};

export function SecurityKeyCredentialListItem(props: { encodedId: string; name: string }) {
	const [state, formAction] = useFormState(deleteSecurityKeyAction, initialSecurityKeyState);
	return (
		<li>
			<p>{props.name}</p>
			<form action={formAction}>
				<input type="hidden" name="credential_id" value={props.encodedId} readOnly />
				<button> Delete </button>
				<p>{state.message}</p>
			</form>
		</li>
	);
}

export function RecoveryCodeSection(props: { recoveryCode: string }) {
	const [recoveryCode, setRecoveryCode] = useState(props.recoveryCode);
	return (
		<section>
			<h1>Recovery code</h1>
			<p>Your recovery code is: {recoveryCode}</p>
			<button
				onClick={async () => {
					const result = await regenerateRecoveryCodeAction();
					if (result.recoveryCode !== null) {
						setRecoveryCode(result.recoveryCode);
					}
				}}
			>
				Generate new code
			</button>
		</section>
	);
}
