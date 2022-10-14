import React from "react";

const LoginPage = React.lazy(() => import('./ui/views/pages/login'))
const RegisterPage = React.lazy(() => import('./ui/views/pages/register'))
const KatalogPage = React.lazy(() => import('./ui/views/pages/katalog-buku'))
const PeminjamanPage = React.lazy(() => import('./ui/views/pages/peminjaman'))


const routes = [
    {path:"/", name : "Login", component : LoginPage, exact : true},
    {path:"/login", name : "Login", component : LoginPage, exact : true},
    {path:"/register", name : "Register", component : RegisterPage, exact : true},
    {path:"/katalog", name : "Katalog Buku", component : KatalogPage, exact : true},
    {path:"/peminjaman", name : "Peminjaman Buku", component : PeminjamanPage, exact : true},

]

export default routes