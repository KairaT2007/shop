import { GalleryVerticalEnd } from "lucide-react"

import { SignUpForm } from "@/components/forms/SignUpForm"

export default function page() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/signup.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}
