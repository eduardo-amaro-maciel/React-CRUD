import RoutesApp from "./routes/RoutesApp"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RoutesApp />
      </ChakraProvider>
    </QueryClientProvider>
  )
}


export default App