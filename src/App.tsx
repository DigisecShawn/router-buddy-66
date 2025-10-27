import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Network from "./pages/Network";
import GPRS from "./pages/GPRS";
import NAT from "./pages/NAT";
import DMZ from "./pages/DMZ";
import Security from "./pages/Security";
import System from "./pages/System";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <Layout>
                  <Devices />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/network"
            element={
              <ProtectedRoute>
                <Layout>
                  <Network />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/gprs"
            element={
              <ProtectedRoute>
                <Layout>
                  <GPRS />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nat"
            element={
              <ProtectedRoute>
                <Layout>
                  <NAT />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dmz"
            element={
              <ProtectedRoute>
                <Layout>
                  <DMZ />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <Layout>
                  <Security />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/system"
            element={
              <ProtectedRoute>
                <Layout>
                  <System />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
