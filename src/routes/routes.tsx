import { Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PublicRoutes from './publicRoutes';
import { publicRoutes } from "./paths";
import Layout from '../layout';

const RouteProvider = () => {
  const _publicRoutes = Object.values(publicRoutes);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoutes />}>
          {_publicRoutes.map((route) => (
            <Route path={route.path} element={route.component} key={uuidv4()} />
          ))}
        </Route>
        {/* //* ADD NOT FOUND PAGE */}
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Route>
    </Routes>
  );
};

export default RouteProvider;
