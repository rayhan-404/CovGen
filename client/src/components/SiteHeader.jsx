'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { authHeaders, clearStoredToken } from '@/lib/client-auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
export function useSessionUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let alive = true;
        fetch('/api/auth/me', { headers: authHeaders(), cache: 'no-store' })
            .then((r) => r.json())
            .then((d) => {
            if (alive)
                setUser(d.user || null);
        })
            .catch(() => alive && setUser(null))
            .finally(() => alive && setLoading(false));
        return () => {
            alive = false;
        };
    }, []);
    return { user, loading };
}
export function SiteHeader({ user }) {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    async function logout() {
        setLoggingOut(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST', headers: authHeaders() });
        }
        catch {
            /* still clear the local session below */
        }
        clearStoredToken();
        navigate('/login');
    }
    const displayName = user?.name || 'Guest';
    return (_jsx("header", { className: "sticky top-0 z-40 w-full border-b border-cov-line/70 bg-white/85 backdrop-blur-md", children: _jsxs("div", { className: "mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3 group", "aria-label": "CovGen home", children: [_jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-[0_6px_16px_-6px_rgba(232,85,30,0.65)] transition-transform group-hover:scale-105", children: _jsx(LayoutGrid, { className: "h-6 w-6 text-white", strokeWidth: 2.4 }) }), _jsxs("span", { className: "leading-tight", children: [_jsx("span", { className: "block text-[17px] font-bold text-primary", children: "University Cover Designer" }), _jsx("span", { className: "block text-[13px] font-medium text-primary/80", children: "& Question Bank" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "hidden sm:block text-[15px] font-semibold text-primary", children: displayName }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, "aria-label": "Account menu", className: "outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full", children: _jsx("button", { className: "flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/25 bg-accent text-primary transition hover:bg-secondary", children: user?.role === 'admin' ? (_jsx(ShieldCheck, { className: "h-5 w-5" })) : (_jsx(UserRound, { className: "h-5 w-5" })) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [_jsxs(DropdownMenuLabel, { children: [_jsx("div", { className: "font-semibold text-foreground", children: displayName }), _jsx("div", { className: "text-xs font-normal text-muted-foreground", children: user ? (user.studentId ? `ID: ${user.studentId}` : 'Administrator') : 'Not logged in' })] }), _jsx(DropdownMenuSeparator, {}), user?.role === 'admin' && (_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/admin", className: "cursor-pointer", children: [_jsx(ShieldCheck, { className: "mr-2 h-4 w-4" }), " Admin Panel"] }) })), user ? (_jsxs(DropdownMenuItem, { onClick: logout, disabled: loggingOut, className: "cursor-pointer text-destructive focus:text-destructive", children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), " ", loggingOut ? 'Logging out…' : 'Log out'] })) : (_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/login", className: "cursor-pointer", children: [_jsx(UserRound, { className: "mr-2 h-4 w-4" }), " Log in / Register"] }) }))] })] })] })] }) }));
}
