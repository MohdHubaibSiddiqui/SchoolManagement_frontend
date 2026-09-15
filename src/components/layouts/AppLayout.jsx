import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ReceiptIndianRupee, BarChart3, ShieldCheck, LogOut, GraduationCap, UserCog, School } from 'lucide-react';

export default function AppLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name') || (role === 'admin' ? 'Administrator' : 'Finance User');
  const links = role === 'admin' ? [
    ['/dashboard','Dashboard',LayoutDashboard], ['/students','Students',Users], ['/fees','Fees',ReceiptIndianRupee], ['/reports','Reports',BarChart3], ['/finance-users','Finance Users',UserCog], ['/classes','Classes',School]
  ] : [
    ['/dashboard','Dashboard',LayoutDashboard], ['/students','Students',Users], ['/fees','Fees',ReceiptIndianRupee], ['/reports','Reports',BarChart3]
  ];
  const logout = () => { localStorage.clear(); navigate('/login'); };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><GraduationCap size={23}/></div><div><b>School<span>MS</span></b><small>Management System</small></div></div>
      <div className="role-pill"><ShieldCheck size={15}/> {role === 'admin' ? 'Administrator' : 'Finance'}</div>
      <nav>{links.map(([to,label,Icon]) => <NavLink key={to} to={to} className={({isActive})=>isActive?'nav-item active':'nav-item'}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><button className="logout-btn" onClick={logout}><LogOut size={18}/> Logout</button></div>
    </aside>
    <div className="main-area">
      <header className="topbar"><div><h1>School Management</h1><p>Manage students, fees and reports</p></div><div className="profile"><div className="avatar">{name.charAt(0).toUpperCase()}</div><div><b>{name}</b><span>{role}</span></div></div></header>
      <main className="content"><Outlet /></main>
    </div>
  </div>
}
