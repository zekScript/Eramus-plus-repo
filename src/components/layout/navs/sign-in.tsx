import { signIn } from "@/app/(front)/auth";
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        await signIn("google", {redirectTo : "/"});
      }}
    >
      <button type="submit">Register</button>
    </form>
  )
} 