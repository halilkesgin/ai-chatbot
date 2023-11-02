import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "./ui/button"

type LoadingButtonProps = {
    loading: boolean
} & ButtonProps

export default function LoadingButton({
    children,
    loading,
    ...props
}: LoadingButtonProps) {
    return (
        <Button {...props} disabled={props.disabled || loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {children}
        </Button>
    )
}