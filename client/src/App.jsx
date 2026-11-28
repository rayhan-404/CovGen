'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SiteHeader, useSessionUser } from '@/components/SiteHeader';
import { HeroBanner } from '@/components/HeroBanner';
import { CoffeeFooter } from '@/components/CoffeeFooter';
import { DEPARTMENTS } from '@/data/departments';
import { DeptSection } from '@/components/DeptSection';
/** CSS exam-paper visual for the hero banner (Figma left side). */
function ExamVisual() {
    return (_jsxs("div", { className: "relative h-[120px] w-[150px] shrink-0", "aria-hidden": true, children: [_jsxs("div", { className: "absolute left-0 top-3 w-[120px] rotate-[-8deg] rounded-lg bg-[#fbfaf7] p-3 shadow-[0_16px_32px_-12px_rgba(90,30,5,0.5)]", children: [_jsx("p", { className: "text-center text-[11px] font-extrabold tracking-wide text-neutral-900", children: "Exam" }), _jsx("div", { className: "mt-2 space-y-1.5", children: [1, 2, 3, 4, 5].map((n) => (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsxs("span", { className: "w-2 text-[7px] font-bold text-neutral-500", children: [n, "."] }), _jsx("div", { className: "h-[3px] flex-1 rounded-full bg-neutral-300" }), _jsx("span", { className: `flex h-3 w-3 items-center justify-center rounded-[3px] text-[6px] font-black text-white ${n % 2 ? 'bg-emerald-600' : 'bg-red-500'}`, children: n % 2 ? '✓' : '✕' })] }, n))) })] }), _jsx("div", { className: "absolute bottom-2 right-0 h-[86px] w-[10px] rotate-[24deg] rounded-full bg-gradient-to-b from-[#f7b32b] via-[#f7b32b] to-[#e88b9a] shadow-md", children: _jsx("span", { className: "absolute -top-1.5 left-1/2 h-3 w-[10px] -translate-x-1/2 rounded-b-[3px] bg-[#e88b9a]" }) })] }));
}
export default function HomePage() {
    const { user, loading: userLoading } = useSessionUser();
    const [styles, setStyles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deptFilter, setDeptFilter] = useState('ALL');
    const [query, setQuery] = useState('');
    useEffect(() => {
        let alive = true;
        fetch('/api/styles')
            .then((r) => r.json())
            .then((d) => {
            if (alive)
                setStyles(Array.isArray(d.styles) ? d.styles : []);
        })
            .catch(() => alive && setStyles([]))
            .finally(() => alive && setLoading(false));
        return () => {
            alive = false;
        };
    }, []);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return styles.filter((s) => {
            const matchDept = deptFilter === 'ALL' || s.department === deptFilter || s.department === 'ALL';
            const matchQuery = !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
            return matchDept && matchQuery;
        });
    }, [styles, deptFilter, query]);
    const sections = useMemo(() => DEPARTMENTS.map((dept) => ({
        deptKey: dept.key,
        styles: filtered.filter((s) => s.department === dept.key || s.department === 'ALL'),
    })).filter((sec) => sec.styles.length > 0), [filtered]);
    return (_jsxs("div", { className: "flex min-h-screen flex-col bg-cov-cream", children: [_jsx(SiteHeader, { user: user }), _jsxs("main", { className: "mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-6 sm:px-6 sm:py-8", children: [_jsx(Link, { to: "/question-bank", className: "block transition-transform hover:scale-[1.005] focus-visible:outline-none", children: _jsx(HeroBanner, { title: "Previous Year's Question", subtitle: "Browse, confirm and download past papers from every department.", visual: _jsx(ExamVisual, {}) }) }), _jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "relative w-full max-w-md", children: [_jsx(Search, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground", "aria-hidden": true }), _jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search cover styles...", "aria-label": "Search cover styles", className: "h-11 rounded-xl border-cov-line bg-white pl-10 text-[15px] shadow-sm" })] }), _jsx("div", { className: "flex flex-wrap items-center gap-2", role: "group", "aria-label": "Filter by department", children: [{ key: 'ALL', short: 'All', color: '#1d1d1f' }, ...DEPARTMENTS].map((d) => {
                                    const active = deptFilter === d.key;
                                    return (_jsxs("button", { type: "button", onClick: () => setDeptFilter(d.key), "aria-pressed": active, className: `flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${active
                                            ? 'border-transparent bg-[#16241d] text-white shadow-md'
                                            : 'border-cov-line bg-white text-foreground/75 hover:border-cov-orange/40 hover:text-foreground'}`, children: [_jsx("span", { className: "h-2 w-2 rounded-full", style: { background: d.key === 'ALL' ? '#9fd6b9' : d.color }, "aria-hidden": true }), d.short] }, d.key));
                                }) })] }), loading ? (_jsxs("div", { className: "space-y-8", "aria-hidden": true, children: [_jsx(Skeleton, { className: "h-[120px] w-full rounded-[28px]" }), _jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", children: Array.from({ length: 4 }).map((_, i) => (_jsx(Skeleton, { className: "h-[290px] rounded-2xl" }, i))) })] })) : sections.length === 0 && (deptFilter !== 'ALL' || query.trim() !== '') ? (_jsxs("div", { className: "mx-auto max-w-lg rounded-[28px] border border-dashed border-cov-line bg-white/70 px-8 py-14 text-center", children: [_jsx("p", { className: "font-script text-3xl font-bold text-primary", children: "No covers match your search\u2026" }), _jsx("p", { className: "mt-3 text-[15px] leading-relaxed text-muted-foreground", children: "Try a different keyword or department \u2014 or clear the filters to browse everything." }), _jsx("button", { type: "button", onClick: () => {
                                    setDeptFilter('ALL');
                                    setQuery('');
                                }, className: "mt-6 rounded-xl bg-primary px-6 py-3 text-[15px] font-semibold text-white shadow-md transition hover:bg-cov-orange-dark", children: "Clear search & filters" })] })) : sections.length === 0 ? (_jsxs("div", { className: "mx-auto max-w-lg rounded-[28px] border border-dashed border-cov-line bg-white/70 px-8 py-14 text-center", children: [_jsx("p", { className: "font-script text-3xl font-bold text-primary", children: "No styles here yet\u2026" }), _jsx("p", { className: "mt-3 text-[15px] leading-relaxed text-muted-foreground", children: "Admins can add cover styles from the Admin Panel \u2014 they will appear here instantly for every student." }), _jsx(Button, { asChild: true, className: "mt-6 rounded-xl bg-primary hover:bg-cov-orange-dark", children: _jsx(Link, { to: "/admin", children: "Open Admin Panel" }) })] })) : (_jsx("div", { className: "space-y-10", children: sections.map((sec) => (_jsx(DeptSection, { deptKey: sec.deptKey, styles: sec.styles }, sec.deptKey))) }))] }), _jsx(CoffeeFooter, { userName: userLoading ? undefined : user?.name })] }));
}
