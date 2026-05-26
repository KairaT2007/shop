import { SignInForm } from "@/components/forms/SignInForm"

export default function page() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <SignInForm />
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/signin.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
