
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "~/ui/button"

export function LoadingButton() {
  return (
    <Button variant="ghost" disabled>
      <ReloadIcon className="h-4 w-4 animate-spin" />
    </Button>
  )
}
