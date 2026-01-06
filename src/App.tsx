import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PendingChangesProvider } from "./contexts/PendingChangesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import System from "./pages/System";
import Network from "./pages/Network";
import Wireless from "./pages/Wireless";
import FourGRouting from "./pages/4GRouting";
import Firewall from "./pages/Firewall";
import SystemConfig from "./pages/SystemConfig";
import SystemLogs from "./pages/SystemLogs";
import Backup from "./pages/Backup";
import VPNIPSec from "./pages/VPNIPSec";
import VPNWireGuard from "./pages/VPNWireGuard";
import VPNOpenVPN from "./pages/VPNOpenVPN";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PendingChangesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/system" element={<System />} />
                        <Route path="/network" element={<Network />} />
                        <Route path="/wireless" element={<Wireless />} />
                        <Route path="/4g-routing" element={<FourGRouting />} />
                        <Route path="/firewall" element={<Firewall />} />
                        <Route path="/system-config" element={<SystemConfig />} />
                        <Route path="/system-logs" element={<SystemLogs />} />
                        <Route path="/backup" element={<Backup />} />
                        <Route path="/vpn-ipsec" element={<VPNIPSec />} />
                        <Route path="/vpn-wireguard" element={<VPNWireGuard />} />
                        <Route path="/vpn-openvpn" element={<VPNOpenVPN />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </PendingChangesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
