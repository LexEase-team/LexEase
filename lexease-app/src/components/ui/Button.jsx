import { forwardRef } from "react"
import { cn } from "../../lib/utils"
// Note: "lucide-react" icons can be used here if needed, but for now just text/children

const Button = forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-md",
        secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destruct: "bg-red-500 text-white hover:bg-red-600",
    }

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    }

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button }
