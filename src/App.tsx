

import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import Home from "./pages/Home";
import Designer from "./pages/Designer";
import Market from "./pages/Market";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/designer" element={<Designer />} />
            <Route path="/market" element={<Market />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
