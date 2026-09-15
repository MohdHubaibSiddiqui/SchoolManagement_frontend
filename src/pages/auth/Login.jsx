import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, LogIn } from 'lucide-react';
import { login } from '../../services/api';

export default function Login(){
 const [form,setForm]=useState({email:'',password:''}); const [loading,setLoading]=useState(false); const [error,setError]=useState(''); const navigate=useNavigate();
 const submit=async e=>{e.preventDefault();setError('');setLoading(true);try{const {data}=await login(form);localStorage.setItem('token',data.token);localStorage.setItem('role',data.user.role);localStorage.setItem('name',data.user.name);localStorage.setItem('email',data.user.email);navigate('/dashboard');}catch(err){setError(err.response?.data?.message||'Invalid email or password');}finally{setLoading(false)}};
 return <div className="auth-page"><div className="auth-card"><div className="auth-brand"><div className="brand-icon large"><GraduationCap size={30}/></div><h1>School<span>MS</span></h1><p>School Management System</p></div><h2>Welcome back</h2><p className="muted">Sign in to continue to your dashboard.</p>{error&&<div className="error-box">{error}</div>}<form onSubmit={submit}><label>Email<input type="email" required placeholder="you@school.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><Mail className="field-icon" size={18}/></label><label>Password<input type="password" required placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><Lock className="field-icon" size={18}/></label><button className="primary-btn" disabled={loading}>{loading?'Signing in...':<><LogIn size={18}/> Sign in</>}</button></form><div className="demo-box"><b>Demo accounts</b><div>Admin: admin@school.com / admin123</div><div>Finance: finance@school.com / finance123</div></div><a href="/" className="back-link">← Back to school website</a></div></div>
}
