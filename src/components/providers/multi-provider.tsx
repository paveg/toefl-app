import { ToastProvider } from "~/ui/toast"

export const MultiProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>
}
