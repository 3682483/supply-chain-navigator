import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, PlayCircle, ShieldCheck, Database, LayoutDashboard, Calculator, Truck, Eye, CheckCircle2, CloudLightning } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Presentation({ onClose }: { onClose: () => void }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const handleLink = (path: string) => {
        onClose();
        navigate(path);
        toast.success("已为您跳转至该功能演示模块");
    };

    const slides = [
        // Slide 0: Cover
        (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 shadow-xl shadow-primary/20">
                    <Database className="w-12 h-12" />
                </div>
                <div>
                    <h1 className="text-5xl font-black bg-gradient-to-br from-primary via-primary/80 to-blue-600 bg-clip-text text-transparent mb-6 tracking-tight">
                        跨境电商供应链数智化中台
                    </h1>
                    <h2 className="text-3xl font-medium text-foreground tracking-wide">
                        基于「领星 ERP」的数据融合与智能预决策方案
                    </h2>
                </div>
                <div className="pt-12 text-muted-foreground flex items-center gap-4">
                    <span className="w-12 h-0.5 bg-muted-foreground/30"></span>
                    <span className="tracking-widest uppercase text-sm font-bold">商业闭门演示课件</span>
                    <span className="w-12 h-0.5 bg-muted-foreground/30"></span>
                </div>
            </div>
        ),
        // Slide 1: Target & Context
        (
            <div className="flex flex-col h-full max-w-5xl mx-auto px-12 py-10 animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-bold border-l-8 border-primary pl-6 mb-12">业务背景与核心痛点解读</h2>
                <div className="grid grid-cols-2 gap-12 flex-1">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3"><Eye className="w-6 h-6 text-warning" /> 当前阶段的核心困扰</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-lg"><span className="text-danger shrink-0 font-bold">1.</span> <span><b>计划部门严重依赖 Excel：</b>按“人/款/时间”多维筛选极小效，衍生指标计算冗余，致盲率高。</span></li>
                            <li className="flex gap-3 text-lg"><span className="text-danger shrink-0 font-bold">2.</span> <span><b>跨境长周期难以追溯：</b>数个月的周期导致备货难以把控，“库销比”口径不统一。</span></li>
                            <li className="flex gap-3 text-lg"><span className="text-danger shrink-0 font-bold">3.</span> <span><b>数据孤岛与协同断链：</b>财务成本、领星运单、中台业务表三套数据极易引发数字打架。</span></li>
                        </ul>
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-8 border border-border/50 shadow-inner space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-success" /> 中台建设终极目标</h3>
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                            “以领星 ERP 为核心底盘，用自建数据中台补齐供应链/研发短板。驱动<b>计划部门</b>形成更科学、精准的库存防线，<b className="text-primary">优化库销比，彻底降低断货与积压风险</b>。”
                        </p>
                        <div className="pt-6 border-t border-border/50">
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg text-sm">明确输出：确定性工作流闭环</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        // Slide 2: Data Architecture
        (
            <div className="flex flex-col h-full max-w-5xl mx-auto px-12 py-10 animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-bold border-l-8 border-primary pl-6 mb-12">第一步：打通数据任督二脉</h2>
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-card p-6 rounded-xl border border-border/50 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><CloudLightning className="w-24 h-24" /></div>
                        <h4 className="font-bold text-lg mb-2 text-primary">领星直连 (优先)</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">开放 API/数据库对联。<br />同步全量订单、销量、FBA库存、广告开支及表现数据。</p>
                    </div>
                    <div className="flex items-center justify-center"><ChevronRight className="w-12 h-12 text-muted-foreground/30 animate-pulse" /></div>
                    <div className="bg-card p-6 rounded-xl border border-border/50 shadow-lg border-t-4 border-t-primary">
                        <h4 className="font-bold text-lg mb-2">中后台手工过渡填补</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">标准化 CSV 表单接入。<br />兜底捕获研发设计及外部驻厂等非标准化长尾数据。</p>
                    </div>
                </div>
                <div className="flex justify-center mt-auto pb-4">
                    <button onClick={() => handleLink('/sync')} className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3">
                        <PlayCircle className="w-6 h-6" /> 立即体验【领星数据同步】模块
                    </button>
                </div>
            </div>
        ),
        // Slide 3: Smart Execution
        (
            <div className="flex flex-col h-full max-w-5xl mx-auto px-12 py-10 animate-in fade-in slide-in-from-right-8">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold border-l-8 border-primary pl-6">第二步：计划测算与供应链共振</h2>
                    <ShieldCheck className="w-12 h-12 text-muted-foreground/20" />
                </div>

                <div className="space-y-6 flex-1">
                    <div className="flex gap-6 items-stretch">
                        <div className="w-16 bg-blue-500/10 flex items-center justify-center rounded-xl border border-blue-500/20 text-blue-600 font-bold text-2xl">M1</div>
                        <div className="flex-1 bg-card p-6 rounded-xl border border-border shadow-md">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Calculator className="w-5 h-5 text-blue-500" /> 1. 计划部门：智能推算防线</h3>
                            <p className="text-muted-foreground mb-4">不再依赖表格拖拽。基于多维度(目标价、退货率、站外流量)，自动得出远期 90-120 天交货采购缺角，生成【智能备货采购矩阵】。</p>
                            <button onClick={() => handleLink('/simulation')} className="text-sm font-bold text-primary hover:underline">演示：查看计划模拟与矩阵沙盘 &rarr;</button>
                        </div>
                    </div>
                    <div className="flex gap-6 items-stretch">
                        <div className="w-16 bg-orange-500/10 flex items-center justify-center rounded-xl border border-orange-500/20 text-orange-600 font-bold text-2xl">M2</div>
                        <div className="flex-1 bg-card p-6 rounded-xl border border-border shadow-md">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Truck className="w-5 h-5 text-orange-500" /> 2. 采购部门：一键接力落地</h3>
                            <p className="text-muted-foreground mb-4">计划部门的矩阵数据不落地就是空谈。采购端一键继承多色多码 SKU 拆件，生成真实向工厂端下发的执行单流。</p>
                            <button onClick={() => handleLink('/supply-chain')} className="text-sm font-bold text-primary hover:underline">演示：查看采购与供应链执行联动 &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
        ),
        // Slide 4: Security
        (
            <div className="flex flex-col h-full max-w-5xl mx-auto px-12 py-10 animate-in fade-in slide-in-from-right-8">
                <h2 className="text-3xl font-bold border-l-8 border-primary pl-6 mb-12">第三步：车间级强防护，杜绝底座风险</h2>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6"><ShieldCheck className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold mb-3">应用层强力隔离体系</h3>
                        <p className="text-muted-foreground mb-6">不依赖数据库层面的简陋拦截。在应用层基于 RBAC 实现颗粒度到 SKU、工厂的动态行级别全息隔离。</p>
                        <button onClick={() => handleLink('/permissions')} className="px-5 py-2.5 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/80 w-full transition-colors flex justify-center items-center gap-2">前往分配系统权限 <ChevronRight className="w-4 h-4" /></button>
                    </div>

                    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6"><Database className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold mb-3">容器化加持与熔断灾备</h3>
                        <p className="text-muted-foreground mb-6">防范 SQL 注入与架构风险。系统支持全池每日凌晨静默快照备份与防呆验证。一键灾难重置引擎保障。</p>
                        <button onClick={() => handleLink('/backup')} className="px-5 py-2.5 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/80 w-full transition-colors flex justify-center items-center gap-2">前往备份灾备中心 <ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        ),
        // Slide 5: Last
        (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8">
                <div className="w-32 h-32 relative">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-2 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-primary">
                        <LayoutDashboard className="w-10 h-10 text-primary" />
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-black mb-4">将战略蓝图转化为实操仪表盘</h2>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                        从宏观目标追踪到底层订单补录，从 AI 赋能归因到严密的权限网络。<br />此生不渝的数据基建与实施方案现已随时准备启航。
                    </p>
                </div>
                <div className="pt-8">
                    <button onClick={() => handleLink('/')} className="px-10 py-4 bg-foreground text-background rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all outline-none ring-[6px] ring-foreground/20">
                        直达【今日关注】全局仪表盘
                    </button>
                </div>
            </div>
        )
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in zoom-in-95 duration-500 text-foreground overflow-hidden">

            {/* PPT Header */}
            <header className="h-16 flex items-center justify-between px-8 border-b border-border/40 shrink-0 bg-card">
                <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-primary" />
                    <span className="font-bold tracking-widest text-sm uppercase text-muted-foreground">PROPOSAL DECK</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">
                        {currentSlide + 1} / {slides.length}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <X className="w-6 h-6 border rounded-full border-border bg-background shadow-sm text-muted-foreground" />
                    </button>
                </div>
            </header>

            {/* Main Slide Content */}
            <main className="flex-1 relative bg-dot-pattern">
                {slides[currentSlide]}
            </main>

            {/* PPT Footer Controls */}
            <footer className="h-20 border-t border-border/40 bg-card/50 backdrop-blur-md shrink-0 flex items-center justify-center gap-8 relative z-10">
                <button
                    disabled={currentSlide === 0}
                    onClick={() => setCurrentSlide(s => s - 1)}
                    className={`p-3 rounded-full flex items-center justify-center transition-all ${currentSlide === 0 ? 'text-muted-foreground/30' : 'text-foreground bg-muted hover:bg-primary hover:text-primary-foreground shadow-sm'}`}
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Paginator dots */}
                <div className="flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? 'bg-primary scale-125' : 'bg-border hover:bg-muted-foreground/50'}`}
                        />
                    ))}
                </div>

                <button
                    disabled={currentSlide === slides.length - 1}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className={`p-3 rounded-full flex items-center justify-center transition-all ${currentSlide === slides.length - 1 ? 'text-muted-foreground/30' : 'text-foreground bg-muted hover:bg-primary hover:text-primary-foreground shadow-sm'}`}
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </footer>

            {/* Basic dot pattern bg css */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .bg-dot-pattern {
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 32px 32px;
          background-position: center;
        }
      `}} />

        </div>
    );
}
