import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProcessConsultation from "./pages/ProcessConsultation";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ClientArea from "./pages/ClientArea";
import ClientQualifications from "./pages/ClientQualifications";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAssembly from "./pages/AdminAssembly";
import AdminProcesses from "./pages/AdminProcesses";
import AdminReports from "./pages/AdminReports";
import AdminProcessConsultation from "./pages/AdminProcessConsultation";
import AdminQualifications from "./pages/AdminQualifications";
import AdminUserOperations from "./pages/AdminUserOperations";
import ProtectedRoute from "./components/ProtectedRoute";
import CreditClaims from "./pages/CreditClaims";
import AssemblyRegistration from "./pages/AssemblyRegistration";
import UsersManagement from "./pages/AdminClientes";
import ClientesAdv from "./pages/ClientesAdv";
import EmpresasManager from "./pages/AdminEmpresas";

const AppContent = () => {
  const location = useLocation();
  const isClientArea =
    location.pathname.startsWith("/cliente") &&
    localStorage.getItem("clientAuthenticated") === "true";
  const isAdminRoute =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";

  return (
    <div className="min-h-screen bg-white">
      {!isClientArea && !isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/consulta-processos" element={<ProcessConsultation />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/cliente" element={<ClientArea />} />
        <Route
          path="/cliente/habilitacoes"
          element={<ClientQualifications />}
        />
        <Route path="/cliente/adv" element={<ClientesAdv />} />
        <Route path="/habilitacoes-credito" element={<CreditClaims />} />
        {/* <Route path="/cadastramento-assembleia" element={<AssemblyRegistration />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminAssembly />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/assembly"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminAssembly />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/processes"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminProcesses />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clientes"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <UsersManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/empresas"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EmpresasManager />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* <Route path="/admin/relatorios" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminReports />
            </AdminLayout>
          </ProtectedRoute>
        } /> */}
        <Route
          path="/admin/consulta"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminProcessConsultation />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/habilitacoes"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminQualifications />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/operacoes"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminUserOperations />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default function App() {
  React.useEffect(() => {
    document.title = "AWDZ | O Futuro da Administração Jurídica";

    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = "/favicon.ico";
    }
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
