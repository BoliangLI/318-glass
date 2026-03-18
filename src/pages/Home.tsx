
import { useState } from "react";
import { Moon, Sun, Sparkles, Zap, Shield, ArrowRight, Waves, Leaf, Droplets } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Waves,
    title: "清新视觉",
    description: "蓝绿色调带来自然清新的视觉体验，如同海洋般宁静舒适。",
    color: "from-cyan-400 to-teal-400",
  },
  {
    icon: Leaf,
    title: "自然灵感",
    description: "源自大自然的配色方案，营造放松、平静的浏览氛围。",
    color: "from-emerald-400 to-green-400",
  },
  {
    icon: Droplets,
    title: "流畅动效",
    description: "如水波般平滑的过渡动画，为用户带来愉悦的交互体验。",
    color: "from-sky-400 to-blue-400",
  },
];

const stats = [
  { label: "用户满意度", value: "98%" },
  { label: "页面加载", value: "<1s" },
  { label: "浏览器兼容", value: "99%" },
  { label: "代码质量", value: "A+" },
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 动态渐变背景 - 蓝绿色系 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 animate-gradient" />
      
      {/* 装饰性光晕 - 蓝绿色系 */}
      <div className="glow w-96 h-96 bg-cyan-400 top-20 left-20 animate-float" />
      <div className="glow w-80 h-80 bg-teal-400 bottom-40 right-20 animate-float-delayed" />
      <div className="glow w-64 h-64 bg-emerald-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-slow" />

      {/* 内容区域 */}
      <div className="relative z-10">
        {/* 导航栏 */}
        <nav className="glass sticky top-0 z-50 mx-4 mt-4 rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
                <Waves className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">AquaGlass</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="glass-card hover:bg-white/20"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </Button>
              <Button className="glass bg-primary/80 hover:bg-primary text-primary-foreground">
                开始使用
              </Button>
            </div>
          </div>
        </nav>

        {/* 主内容区 */}
        <main className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero 区域 */}
          <section className="text-center mb-24">
            <div className="glass inline-block px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-foreground">
                🌊 蓝绿色毛玻璃设计体验
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              清新蓝绿
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                毛玻璃网页
              </span>
            </h1>
            
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
              体验如海洋般宁静的视觉美学，半透明模糊效果带来自然舒适的层次感
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="glass bg-primary/80 hover:bg-primary text-primary-foreground text-lg px-8">
                免费开始
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="glass text-foreground border-foreground/30 hover:bg-white/20 text-lg px-8">
                了解更多
              </Button>
            </div>
          </section>

          {/* 数据统计 */}
          <section className="glass rounded-3xl p-8 mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 功能卡片 */}
          <section className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              核心特性
            </h2>
            <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
              精心设计的每一个细节，只为带来最佳的用户体验
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`glass-card cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    activeCard === index ? "scale-105 shadow-2xl" : ""
                  }`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-foreground/70">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${feature.color} rounded-full transition-all duration-700`}
                        style={{ width: activeCard === index ? "100%" : "30%" }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA 区域 */}
          <section className="glass rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              准备好开始了吗？
            </h2>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
              立即体验蓝绿色毛玻璃效果带来的视觉革命，打造令人难忘的网页设计
            </p>
            <Button size="lg" className="glass bg-primary/80 hover:bg-primary text-primary-foreground text-lg px-10">
              立即创建
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </section>
        </main>

        {/* 页脚 */}
        <footer className="glass mt-24 mx-4 mb-4 rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-foreground/60">
            <p>© 2024 AquaGlass. 用蓝绿色毛玻璃效果重新定义网页设计</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
