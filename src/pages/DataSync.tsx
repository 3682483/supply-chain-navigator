import { useState } from "react";
import { CloudLightning, Upload, Plus, FileSpreadsheet, RefreshCw, CheckCircle2, AlertCircle, ShoppingCart, Package, Truck, LineChart, Megaphone, Database, Download, X, Save } from "lucide-react";
import { toast } from "sonner";

type LingXingDomain = "sales" | "inventory" | "warehouse" | "operations" | "ads";

const domainIcons: Record<LingXingDomain, any> = {
    sales: ShoppingCart,
    inventory: Package,
    warehouse: Truck,
    operations: LineChart,
    ads: Megaphone,
};

const domainNames: Record<LingXingDomain, string> = {
    sales: "销售/订单相关",
    inventory: "库存与状态结构",
    warehouse: "出入库流转记录",
    operations: "运营流量表现",
    ads: "综合广告统计",
};

const domainDetails: Record<LingXingDomain, string> = {
    sales: "包含日均单量、各渠道销售额、履约流水等电商核心订单切片数据",
    inventory: "包含底层库存总明细、现货率、FBA在途及多仓预留数据互通",
    warehouse: "包含打标扫码流、换标返仓记录、及FBA分仓履约轨迹等",
    operations: "包含Listing类目表现考评、全局站内外流量/渠道跳出率考量等维度",
    ads: "广告花费(SP/SB/SD明细等统管)、ACoS结构、流量投入产出转化追踪",
};

const manualFieldsDictionary = [
    { category: "预期", name: "月度业务目标单量", desc: "运营设定的计划发货单量与销额", source: "中台", granularity: "SKU", freq: "月度", role: "运营组长", note: "大促按周切分" },
    { category: "库存", name: "可发货现货明细", desc: "海外仓/FBA实际可调拨的物理现货数量", source: "领星", granularity: "SKU", freq: "每日", role: "仓储主管", note: "剔除残次" },
    { category: "在途", name: "头程入仓在途量", desc: "已发货但尚未完成目的仓上架的数量", source: "领星", granularity: "SKU/批次", freq: "每日自动", role: "物流专员", note: "" },
    { category: "在产", name: "工厂车间排期量", desc: "已经确认产能但尚未出厂交割的订单量", source: "外部 / 中台", granularity: "订单", freq: "每周", role: "跟单员", note: "强依赖外部延期报备" },
    { category: "采购", name: "核算实际采购单价", desc: "剔除税点或特殊加工费后的实际件单价", source: "中台", granularity: "SKU", freq: "随单触发", role: "采购核价", note: "强隐私限制" },
    { category: "经营模型", name: "加权退货预估率", desc: "平台历史退款量加权平滑修正比例", source: "中台", granularity: "SPU", freq: "模型动态", role: "数据分析师", note: "" },
    { category: "广告/运营", name: "归因单件广告CPA", desc: "精准映射到最终成交单件的流量开支", source: "领星", granularity: "SKU", freq: "隔日", role: "广告投放", note: "防拥堵异步拉取" },
];

export default function DataSync() {
    const [activeMainTab, setActiveMainTab] = useState<"api" | "manual">("api");
    const [activeDomain, setActiveDomain] = useState<LingXingDomain>("sales");
    const [isSyncing, setIsSyncing] = useState(false);
    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
    const [syncStatus, setSyncStatus] = useState<Record<LingXingDomain, string>>({
        sales: "10分钟前已同步",
        inventory: "昨天 23:59 已同步",
        warehouse: "等待同步...",
        operations: "当前数据缺失",
        ads: "昨天 23:59 已同步",
    });

    const handleSync = () => {
        setIsSyncing(true);
        toast.info(`正在尝试连接「领星开放平台」获取【${domainNames[activeDomain]}】数据...`);
        setTimeout(() => {
            setIsSyncing(false);
            const msg = `从领星拉取 ${domainNames[activeDomain]} 数据完成，共更新 ${Math.floor(Math.random() * 5000) + 1200} 条底层数据！`;
            toast.success(msg);
            setSyncStatus({ ...syncStatus, [activeDomain]: "刚刚（最新）" });
        }, 2000);
    };

    const handleManualUpload = () => {
        toast.message("解析成功", {
            description: "发现 865 条有效 SKU 扩展数据可以覆盖至系统底池中。等待提交审核。",
        });
    };

    return (
        <div className="space-y-6 max-w-[1200px] h-[calc(100vh-100px)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h2 className="section-title mb-1 flex items-center gap-2"><CloudLightning className="w-5 h-5" /> 领星底池接入与数据补录过渡台</h2>
                    <div className="text-sm text-muted-foreground">提供直连领星 ERP API 无缝集成方案与人工补充数据的兜底切换双保险</div>
                </div>

                {/* Main Tab Switcher */}
                <div className="flex bg-muted/60 p-1 rounded-xl shadow-inner border border-border/50">
                    <button
                        onClick={() => setActiveMainTab("api")}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === 'api' ? 'bg-background shadow text-primary' : 'text-muted-foreground hover:bg-muted/80'}`}
                    >
                        <Database className="w-4 h-4" /> 领星 API 专线直连 (首推)
                    </button>
                    <button
                        onClick={() => setActiveMainTab("manual")}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeMainTab === 'manual' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:bg-muted/80'}`}
                    >
                        <FileSpreadsheet className="w-4 h-4" /> 线下补录与商品维护层
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden">

                {/* API Tab Content */}
                {activeMainTab === "api" && (
                    <div className="flex h-full">
                        {/* Left Sidebar for Domains */}
                        <div className="w-64 border-r border-border bg-muted/10 flex flex-col shrink-0">
                            <div className="p-4 border-b border-border/50 text-xs font-bold text-muted-foreground tracking-wider uppercase">候选数据域 (Data Domains)</div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                {(Object.keys(domainIcons) as LingXingDomain[]).map(domain => {
                                    const Icon = domainIcons[domain];
                                    const isActive = activeDomain === domain;
                                    const status = syncStatus[domain];
                                    const isSuccess = status.includes("已") || status.includes("新");

                                    return (
                                        <div
                                            key={domain}
                                            onClick={() => setActiveDomain(domain)}
                                            className={`p-3 rounded-lg cursor-pointer border transition-all ${isActive ? 'bg-primary/5 border-primary shadow-sm text-primary' : 'bg-background border-transparent hover:border-border/80 text-foreground'}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <Icon className="w-4 h-4" />
                                                <div className="font-bold text-sm">{domainNames[domain]}</div>
                                            </div>
                                            <div className={`text-[10px] mt-1.5 flex items-center gap-1 ${isSuccess ? 'text-success' : 'text-warning'}`}>
                                                {isSuccess ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {status}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right Content for Specific Domain */}
                        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center bg-background/50 relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                                {(() => {
                                    const Icon = domainIcons[activeDomain];
                                    return <Icon className="w-96 h-96" />
                                })()}
                            </div>

                            <div className="max-w-md relative z-10">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                                    {(() => {
                                        const Icon = domainIcons[activeDomain];
                                        return <Icon className="w-8 h-8 text-primary" />
                                    })()}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">领星「{domainNames[activeDomain]}」数据管线</h3>
                                <p className="text-muted-foreground text-sm mb-8 leading-relaxed h-10">
                                    {domainDetails[activeDomain]}
                                </p>

                                <div className="p-4 bg-muted/40 rounded-xl border border-border/50 mb-8 space-y-3 text-left">
                                    <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                                        <span className="text-muted-foreground">最后同步基准：</span>
                                        <span className="font-medium">{syncStatus[activeDomain]}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">当前通信状态：</span>
                                        <span className="font-medium flex items-center gap-1.5 text-success"><CheckCircle2 className="w-4 h-4" /> 通道畅通，鉴权合法</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSync}
                                    disabled={isSyncing}
                                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg border outline-none transition-all ${isSyncing ? 'bg-muted text-muted-foreground border-border cursor-not-allowed' : 'bg-primary text-primary-foreground border-primary hover:opacity-90 hover:scale-[1.02]'}`}
                                >
                                    {isSyncing ? (
                                        <><RefreshCw className="w-5 h-5 animate-spin" /> 安全拉取并执行映射对齐中...</>
                                    ) : (
                                        <><CloudLightning className="w-5 h-5" /> 一键强制全量同步此域</>
                                    )}
                                </button>

                                {activeDomain === 'ads' && (
                                    <div className="mt-4 text-[10px] text-danger/80 bg-danger/5 px-3 py-2 rounded-lg flex items-center gap-1.5">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        当前接口层涉及大量 SP/SD 极细颗粒数据，全量同步可能需 3-5 分钟阻塞，请谨慎评估。
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Manual Tab Content (Fallback) */}
                {activeMainTab === "manual" && (
                    <div className="flex flex-col h-full bg-background border-t border-border relative">
                        <div className="p-4 border-b border-border flex items-center justify-between shrink-0 bg-muted/5">
                            <h3 className="font-bold flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> 商品核心附加信息库矩阵 (过渡兜底处理)</h3>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 border border-border text-foreground hover:bg-muted text-xs font-bold rounded-lg transition-colors flex items-center gap-2">
                                    <Download className="w-3.5 h-3.5" /> 导出字段模板
                                </button>
                                <div className="h-4 w-px bg-border"></div>
                                <button onClick={handleManualUpload} className="px-4 py-2 bg-success text-success-foreground hover:opacity-90 text-xs font-bold rounded-lg transition-opacity flex items-center gap-2 shadow-sm">
                                    <Upload className="w-3.5 h-3.5" /> 批量导入 (CSV/Excel)
                                </button>
                                <button onClick={() => setIsEntryModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold rounded-lg transition-opacity flex items-center gap-2 shadow-sm">
                                    <Plus className="w-3.5 h-3.5" /> 单条表单手工补充
                                </button>
                            </div>
                        </div>

                        <div className="p-0 overflow-auto flex-1 bg-background relative">
                            {/* Matrix Dictionary View */}
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-muted/40 sticky top-0 z-10 text-muted-foreground shadow-sm">
                                    <tr>
                                        <th className="px-4 py-3 font-medium border-b border-border w-24">字段分类</th>
                                        <th className="px-4 py-3 font-medium border-b border-border">字段名（业务名）</th>
                                        <th className="px-4 py-3 font-medium border-b border-border hidden md:table-cell">口径/说明</th>
                                        <th className="px-4 py-3 font-medium border-b border-border">来源信托</th>
                                        <th className="px-4 py-3 font-medium border-b border-border">主键粒度</th>
                                        <th className="px-4 py-3 font-medium border-b border-border">更新频率</th>
                                        <th className="px-4 py-3 font-medium border-b border-border">责任角色</th>
                                        <th className="px-4 py-3 font-medium border-b border-border">备注</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {manualFieldsDictionary.map((field, idx) => (
                                        <tr key={idx} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-4 py-3 font-bold text-primary">
                                                <span className="bg-primary/10 px-2 py-1 rounded-md text-xs">{field.category}</span>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-foreground">{field.name}</td>
                                            <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell w-1/4">{field.desc}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${field.source === '中台' ? 'bg-blue-500/10 text-blue-600' : field.source === '领星' ? 'bg-orange-500/10 text-orange-600' : 'bg-muted text-muted-foreground'}`}>{field.source}</span>
                                            </td>
                                            <td className="px-4 py-3 text-xs font-mono">{field.granularity}</td>
                                            <td className="px-4 py-3 text-xs">{field.freq}</td>
                                            <td className="px-4 py-3 text-xs text-muted-foreground flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-success opacity-0 group-hover:opacity-100 transition-opacity" /> {field.role}</td>
                                            <td className="px-4 py-3 text-xs text-muted-foreground">{field.note || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex items-center justify-center p-8 opacity-40">
                                <div className="text-xs">该底层字段矩阵用于约束手工录入与表格导入规范，非规范报文将被拦截。</div>
                            </div>
                        </div>

                        {/* Manual Entry Form Modal overlay */}
                        {isEntryModalOpen && (
                            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                                <div className="bg-card border border-border w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
                                    <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                                        <h3 className="font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> 新增主键兜底数据行 (过渡专用)</h3>
                                        <button onClick={() => setIsEntryModalOpen(false)} className="text-muted-foreground hover:bg-muted p-1.5 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                                    </div>
                                    <div className="p-6 overflow-y-auto space-y-8 flex-1">

                                        <div className="grid grid-cols-2 gap-6">
                                            <div><label className="text-xs font-bold text-muted-foreground mb-1 block">绑定目标主键 (SKU / 订单号)</label><input type="text" className="w-full px-3 py-2 border rounded-md bg-muted/30 focus:outline-none focus:border-primary" placeholder="输入平台主键标识..." /></div>
                                            <div><label className="text-xs font-bold text-muted-foreground mb-1 block">记录业务周期</label><input type="month" className="w-full px-3 py-2 border rounded-md bg-muted/30 focus:outline-none focus:border-primary" /></div>
                                        </div>

                                        {manualFieldsDictionary.map((field, idx) => (
                                            <div key={idx} className="bg-muted/10 border border-border/50 rounded-lg p-4 group hover:border-primary/30 transition-colors relative">
                                                <div className="absolute top-0 right-0 bg-muted px-2 py-0.5 text-[10px] rounded-bl-lg text-muted-foreground">{field.source}录入层</div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">{field.category}</span>
                                                    <span className="font-medium text-sm">{field.name}</span>
                                                </div>
                                                <div className="mb-3 text-xs text-muted-foreground">{field.desc} <span className="text-primary/70 ml-2">({field.granularity})</span></div>
                                                <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-primary text-sm shadow-sm" placeholder={`请正确填写 ${field.name} 数据...`} />
                                            </div>
                                        ))}

                                    </div>
                                    <div className="p-4 border-t border-border flex justify-end gap-3 shrink-0 bg-muted/5">
                                        <button onClick={() => setIsEntryModalOpen(false)} className="px-5 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">取消丢弃</button>
                                        <button onClick={() => { toast.success("手工行级数据提交审核成功，已投递至合并映射池。"); setIsEntryModalOpen(false) }} className="px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow flex items-center gap-2 hover:opacity-90">
                                            <Save className="w-4 h-4" /> 确认校验并提报
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
