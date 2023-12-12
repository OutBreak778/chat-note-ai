import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "./button"

type buttonLoadingProps = {
    loading: boolean
} & ButtonProps

export default function ButtonLoading({loading,children,...props}:buttonLoadingProps) {
    return(
        <Button {...props} disabled={props.disabled || loading}>
            {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            {children}
        </Button>
    )
}