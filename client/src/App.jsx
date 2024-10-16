import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { lazy, useMemo, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
const Layout = lazy(() => import("./scenes/layout"));
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Products = lazy(() => import("./scenes/products"));
const Customers = lazy(() => import("./scenes/customers"));
const Transactions = lazy(() => import("./scenes/transactions"));
const Geography = lazy(() => import("./scenes/geography"));
const Overview = lazy(() => import("./scenes/overview"));
const Daily = lazy(() => import("./scenes/daily"));
const Monthly = lazy(() => import("./scenes/monthly"));
const Breakdown = lazy(() => import("./scenes/breakdown"));
const Admin = lazy(() => import("./scenes/admin"));
const Performance = lazy(() => import("./scenes/performance"));
const SignIn = lazy(() => import("./components/SignIn"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div
      className={`theme ${mode} bg-white dark:bg-[color:var(--backGround-color-dark)]`}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<SignIn />} />
              <Route element={<PrivateRoute />}>
                <Route path="/DashBoard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/performance" element={<Performance />} />
              </Route>
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
