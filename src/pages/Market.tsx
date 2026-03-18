
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Sparkles, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface GlassStyle {
  bgColor: string;
  bgAlpha: number;
  blur: number;
  borderWidth: number;
  borderColor: string;
  borderAlpha: number;
  borderRadius: number;
  shadowColor: string;
  shadowAlpha: number;
  shadowBlur: number;
  textColor: string;
}

interface StyleTemplate {
  id: string;
  name: string;
  category: string;
  gradient: string;
  style: GlassStyle;
  tags: string[];
}

const styleTemplates: StyleTemplate[] = [
  {
    id: "ocean-breeze",
    name: "海洋清风",
    category: "清新自然",
    gradient: "from-cyan-400 via-teal-400 to-emerald-400",
    style: {
      bgColor: "#ffffff",
      bgAlpha: 0.3,
      blur: 20,
      borderWidth: 1,
      borderColor: "#ffffff",
      borderAlpha: 0.4,
      borderRadius: 20,
      shadowColor: "#0891b2",
      shadowAlpha: 0.15,
      shadowBlur: 40,
      textColor: "#0e7490",
    },
    tags: ["热门", "清新"],
  },
  {
    id: "emerald-forest",
    name: "翡翠森林",
    category: "清新自然",
    gradient: "from-emerald-400 via-green-400 to-teal-400",
    style: {
      bgColor: "#f0fdf4",
      bgAlpha: 0.35,
      blur: 18,
      borderWidth: 1.5,
      borderColor: "#86efac",
      borderAlpha: 0.5,
      borderRadius: 16,
      shadowColor: "#059669",
      shadowAlpha: 0.12,
      shadowBlur: 32,
      textColor: "#047857",
    },
    tags: ["自然", "绿色"],
  },
  {
    id: "sunset-glow",
    name: "日落橙光",
    category: "温暖柔和",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    style: {
      bgColor: "#fff7ed",
      bgAlpha: 0.35,
      blur: 18,
      borderWidth: 2,
      borderColor: "#fdba74",
      borderAlpha: 0.5,
      borderRadius: 16,
      shadowColor: "#ea580c",
      shadowAlpha: 0.12,
      shadowBlur: 36,
      textColor: "#c2410c",
    },
    tags: ["温暖", "日落"],
  },
  {
    id: "coral-dream",
    name: "珊瑚梦境",
    category: "温暖柔和",
    gradient: "from-pink-400 via-rose-400 to-orange-300",
    style: {
      bgColor: "#fff1f2",
      bgAlpha: 0.3,
      blur: 22,
      borderWidth: 1,
      borderColor: "#fda4af",
      borderAlpha: 0.4,
      borderRadius: 24,
      shadowColor: "#e11d48",
      shadowAlpha: 0.1,
      shadowBlur: 38,
      textColor: "#be123c",
    },
    tags: ["浪漫", "粉色"],
  },
  {
    id: "midnight-deep",
    name: "深邃夜空",
    category: "深邃优雅",
    gradient: "from-slate-900 via-purple-900 to-slate-900",
    style: {
      bgColor: "#1a1a2e",
      bgAlpha: 0.4,
      blur: 24,
      borderWidth: 1,
      borderColor: "#ffffff",
      borderAlpha: 0.15,
      borderRadius: 24,
      shadowColor: "#000000",
      shadowAlpha: 0.3,
      shadowBlur: 48,
      textColor: "#e0e0e0",
    },
    tags: ["暗色", "优雅"],
  },
  {
    id: "violet-dream",
    name: "紫罗兰梦",
    category: "深邃优雅",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    style: {
      bgColor: "#faf5ff",
      bgAlpha: 0.3,
      blur: 22,
      borderWidth: 1,
      borderColor: "#e9d5ff",
      borderAlpha: 0.4,
      borderRadius: 28,
      shadowColor: "#7c3aed",
      shadowAlpha: 0.15,
      shadowBlur: 44,
      textColor: "#6d28d9",
    },
    tags: ["梦幻", "紫色"],
  },
  {
    id: "neon-night",
    name: "霓虹之夜",
    category: "活力四射",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    style: {
      bgColor: "#f0f9ff",
      bgAlpha: 0.25,
      blur: 16,
      borderWidth: 2,
      borderColor: "#22d3ee",
      borderAlpha: 0.6,
      borderRadius: 12,
      shadowColor: "#06b6d4",
      shadowAlpha: 0.2,
      shadowBlur: 30,
      textColor: "#0369a1",
    },
    tags: ["活力", "渐变"],
  },
  {
    id: "rainbow-frost",
    name: "彩虹糖霜",
    category: "活力四射",
    gradient: "from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400",
    style: {
      bgColor: "#ffffff",
      bgAlpha: 0.28,
      blur: 20,
      borderWidth: 1.5,
      borderColor: "#f0abfc",
      borderAlpha: 0.5,
      borderRadius: 20,
      shadowColor: "#d946ef",
      shadowAlpha: 0.15,
      shadowBlur: 36,
      textColor: "#86198f",
    },
    tags: ["多彩", "活泼"],
  },
  {
    id: "minimal-white",
    name: "极简白",
    category: "清新自然",
    gradient: "from-gray-100 via-white to-gray-50",
    style: {
      bgColor: "#ffffff",
      bgAlpha: 0.4,
      blur: 12,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderAlpha: 0.6,
      borderRadius: 8,
      shadowColor: "#000000",
      shadowAlpha: 0.08,
      shadowBlur: 24,
      textColor: "#374151",
    },
    tags: ["简约", "干净"],
  },
  {
    id: "glacier-blue",
    name: "冰川蓝",
    category: "清新自然",
    gradient: "from-sky-300 via-blue-300 to-cyan-200",
    style: {
      bgColor: "#f0f9ff",
      bgAlpha: 0.35,
      blur: 18,
      borderWidth: 1,
      borderColor: "#bae6fd",
      borderAlpha: 0.5,
      borderRadius: 18,
      shadowColor: "#0284c7",
      shadowAlpha: 0.12,
      shadowBlur: 34,
      textColor: "#0369a1",
    },
    tags: ["清爽", "蓝色"],
  },
  {
    id: "rose-gold",
    name: "玫瑰金",
    category: "深邃优雅",
    gradient: "from-rose-300 via-pink-300 to-amber-200",
    style: {
      bgColor: "#fff5f5",
      bgAlpha: 0.32,
      blur: 20,
      borderWidth: 1.5,
      borderColor: "#fca5a5",
      borderAlpha: 0.45,
      borderRadius: 22,
      shadowColor: "#be123c",
      shadowAlpha: 0.12,
      shadowBlur: 38,
      textColor: "#9f1239",
    },
    tags: ["奢华", "金属"],
  },
  {
    id: "mint-fresh",
    name: "薄荷清凉",
    category: "清新自然",
    gradient: "from-teal-200 via-emerald-200 to-cyan-200",
    style: {
      bgColor: "#f0fdfa",
      bgAlpha: 0.38,
      blur: 16,
      borderWidth: 1,
      borderColor: "#99f6e4",
      borderAlpha: 0.5,
      borderRadius: 16,
      shadowColor: "#14b8a6",
      shadowAlpha: 0.1,
      shadowBlur: 30,
      textColor: "#0f766e",
    },
    tags: ["夏日", "清新"],
  },
];

const categories = ["全部", "清新自然", "温暖柔和", "深邃优雅", "活力四射"];

export default function Market() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredStyles = activeCategory === "全部" 
    ? styleTemplates 
    : styleTemplates.filter(s => s.category === activeCategory);

  const handleUseStyle = (style: GlassStyle) => {
    localStorage.setItem("glassStyle", JSON.stringify(style));
    toast.success("样式已保存，跳转到设计器！");
    setTimeout(() => navigate("/designer"), 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24">
      {/* 动态渐变背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 animate-gradient" />
      
      {/* 装饰性光晕 */}
      <div className="glow w-96 h-96 bg-cyan-400 top-20 left-20 animate-float" />
      <div className="glow w-80 h-80 bg-teal-400 bottom-40 right-20 animate-float-delayed" />
      <div className="glow w-64 h-64 bg-emerald-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-slow" />

      {/* 内容区域 */}
      <div className="relative z-10">
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* 页面标题 */}
          <section className="text-center mb-8">
            <div className="glass inline-block px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-foreground">
                🎨 精选毛玻璃样式模板
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              样式<span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">市场</span>
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              浏览并应用精心设计的毛玻璃样式模板，一键打造专业视觉效果
            </p>
          </section>

          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full ${
                  activeCategory === category
                    ? "glass bg-primary/80 text-primary-foreground"
                    : "glass text-foreground border-foreground/30 hover:bg-white/20"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* 样式网格 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStyles.map((template) => (
              <Card
                key={template.id}
                className="glass-card overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                      <Palette className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {template.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-foreground">{template.name}</CardTitle>
                  <CardDescription className="text-foreground/70">{template.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* 预览区域 */}
                  <div className={`relative h-24 rounded-xl overflow-hidden bg-gradient-to-br ${template.gradient}`}>
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 p-3"
                      style={{
                        background: `rgba(${parseInt(template.style.bgColor.slice(1, 3), 16)}, ${parseInt(template.style.bgColor.slice(3, 5), 16)}, ${parseInt(template.style.bgColor.slice(5, 7), 16)}, ${template.style.bgAlpha})`,
                        backdropFilter: `blur(${template.style.blur}px)`,
                        border: `${template.style.borderWidth}px solid rgba(255, 255, 255, ${template.style.borderAlpha})`,
                        borderRadius: `${template.style.borderRadius}px`,
                      }}
                    >
                      <div className="text-xs font-medium text-center" style={{ color: template.style.textColor }}>
                        预览
                      </div>
                    </div>
                  </div>
                  
                  {/* 参数信息 */}
                  <div className="flex justify-between text-xs text-foreground/60">
                    <span>模糊：{template.style.blur}px</span>
                    <span>透明：{Math.round(template.style.bgAlpha * 100)}%</span>
                    <span>圆角：{template.style.borderRadius}px</span>
                  </div>
                  
                  {/* 使用按钮 */}
                  <Button
                    className="w-full glass bg-primary/80 hover:bg-primary text-primary-foreground rounded-full"
                    onClick={() => handleUseStyle(template.style)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    使用此样式
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 提示区域 */}
          <Card className="glass-card mt-12">
            <CardContent className="py-8">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">没有找到心仪的样式？</h3>
                <p className="text-foreground/70 mb-4">前往设计器自定义专属你的毛玻璃效果</p>
                <Button
                  className="glass bg-primary/80 hover:bg-primary text-primary-foreground rounded-full"
                  onClick={() => navigate("/designer")}
                >
                  打开设计器
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* 页脚 */}
        <footer className="glass mt-16 mx-4 mb-4 rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-foreground/60">
            <p>© 2024 AquaGlass 市场 · 发现更多精美毛玻璃样式</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
