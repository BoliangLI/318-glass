
import { useState } from "react";
import { Sparkles, Copy, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const defaultStyle: GlassStyle = {
  bgColor: "#ffffff",
  bgAlpha: 0.25,
  blur: 16,
  borderWidth: 1,
  borderColor: "#ffffff",
  borderAlpha: 0.3,
  borderRadius: 16,
  shadowColor: "#000000",
  shadowAlpha: 0.1,
  shadowBlur: 32,
  textColor: "#1a1a1a",
};

const presetStyles = [
  {
    name: "清新蓝绿",
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
  },
  {
    name: "深邃暗色",
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
  },
  {
    name: "温暖橙色",
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
  },
  {
    name: "梦幻紫色",
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
  },
];

export default function Designer() {
  const [style, setStyle] = useState<GlassStyle>(defaultStyle);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("custom");

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const generateCSS = () => {
    return `.glass-custom {
  background: ${hexToRgba(style.bgColor, style.bgAlpha)};
  backdrop-filter: blur(${style.blur}px);
  -webkit-backdrop-filter: blur(${style.blur}px);
  border: ${style.borderWidth}px solid ${hexToRgba(style.borderColor, style.borderAlpha)};
  border-radius: ${style.borderRadius}px;
  box-shadow: 0 8px ${style.shadowBlur}px ${hexToRgba(style.shadowColor, style.shadowAlpha)};
}`;
  };

  const generateTailwind = () => {
    return `className="bg-[${hexToRgba(style.bgColor, style.bgAlpha)}] backdrop-blur-[${style.blur}px] border-[${style.borderWidth}px] border-[${hexToRgba(style.borderColor, style.borderAlpha)}] rounded-[${style.borderRadius}px] shadow-[0_8px_${style.shadowBlur}px_${hexToRgba(style.shadowColor, style.shadowAlpha)}]"`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("已复制到剪贴板！");
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (presetStyle: GlassStyle) => {
    setStyle(presetStyle);
    setActiveTab("custom");
    toast.success("已应用预设样式！");
  };

  const previewStyle = {
    background: hexToRgba(style.bgColor, style.bgAlpha),
    backdropFilter: `blur(${style.blur}px)`,
    WebkitBackdropFilter: `blur(${style.blur}px)`,
    border: `${style.borderWidth}px solid ${hexToRgba(style.borderColor, style.borderAlpha)}`,
    borderRadius: `${style.borderRadius}px`,
    boxShadow: `0 8px ${style.shadowBlur}px ${hexToRgba(style.shadowColor, style.shadowAlpha)}`,
    color: style.textColor,
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24">
      {/* 动态渐变背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 animate-gradient" />
      
      {/* 装饰性光晕 */}
      <div className="glow w-96 h-96 bg-cyan-400 top-20 left-20 animate-float" />
      <div className="glow w-80 h-80 bg-teal-400 bottom-40 right-20 animate-float-delayed" />

      {/* 内容区域 */}
      <div className="relative z-10">
        {/* 主内容区 */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* 页面标题 */}
          <section className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              自定义你的<span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">毛玻璃效果</span>
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              调整颜色、透明度、模糊度等参数，实时预览并导出 CSS 代码
            </p>
          </section>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 左侧：控制面板 */}
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="glass rounded-full p-1 mb-6">
                  <TabsTrigger value="custom" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    自定义
                  </TabsTrigger>
                  <TabsTrigger value="presets" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    预设样式
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="custom" className="space-y-4">
                  {/* 背景设置 */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">背景设置</CardTitle>
                      <CardDescription>调整背景颜色和透明度</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">背景颜色</Label>
                        <div className="flex gap-3">
                          <Input
                            type="color"
                            value={style.bgColor}
                            onChange={(e) => setStyle({ ...style, bgColor: e.target.value })}
                            className="w-16 h-10 rounded-lg cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={style.bgColor}
                            onChange={(e) => setStyle({ ...style, bgColor: e.target.value })}
                            className="flex-1 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground">透明度：{Math.round(style.bgAlpha * 100)}%</Label>
                        <Slider
                          value={[style.bgAlpha]}
                          onValueChange={([v]) => setStyle({ ...style, bgAlpha: v })}
                          min={0}
                          max={1}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 模糊效果 */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">模糊效果</CardTitle>
                      <CardDescription>调整背景模糊强度</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">模糊半径：{style.blur}px</Label>
                        <Slider
                          value={[style.blur]}
                          onValueChange={([v]) => setStyle({ ...style, blur: v })}
                          min={0}
                          max={50}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 边框设置 */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">边框设置</CardTitle>
                      <CardDescription>调整边框宽度、颜色和透明度</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">边框宽度：{style.borderWidth}px</Label>
                        <Slider
                          value={[style.borderWidth]}
                          onValueChange={([v]) => setStyle({ ...style, borderWidth: v })}
                          min={0}
                          max={4}
                          step={0.5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground">边框颜色</Label>
                        <div className="flex gap-3">
                          <Input
                            type="color"
                            value={style.borderColor}
                            onChange={(e) => setStyle({ ...style, borderColor: e.target.value })}
                            className="w-16 h-10 rounded-lg cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={style.borderColor}
                            onChange={(e) => setStyle({ ...style, borderColor: e.target.value })}
                            className="flex-1 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground">边框透明度：{Math.round(style.borderAlpha * 100)}%</Label>
                        <Slider
                          value={[style.borderAlpha]}
                          onValueChange={([v]) => setStyle({ ...style, borderAlpha: v })}
                          min={0}
                          max={1}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 圆角设置 */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">圆角设置</CardTitle>
                      <CardDescription>调整边角圆润程度</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">圆角半径：{style.borderRadius}px</Label>
                        <Slider
                          value={[style.borderRadius]}
                          onValueChange={([v]) => setStyle({ ...style, borderRadius: v })}
                          min={0}
                          max={50}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 阴影设置 */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">阴影设置</CardTitle>
                      <CardDescription>调整阴影颜色和强度</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">阴影颜色</Label>
                        <div className="flex gap-3">
                          <Input
                            type="color"
                            value={style.shadowColor}
                            onChange={(e) => setStyle({ ...style, shadowColor: e.target.value })}
                            className="w-16 h-10 rounded-lg cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={style.shadowColor}
                            onChange={(e) => setStyle({ ...style, shadowColor: e.target.value })}
                            className="flex-1 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground">阴影透明度：{Math.round(style.shadowAlpha * 100)}%</Label>
                        <Slider
                          value={[style.shadowAlpha]}
                          onValueChange={([v]) => setStyle({ ...style, shadowAlpha: v })}
                          min={0}
                          max={0.5}
                          step={0.01}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground">阴影模糊：{style.shadowBlur}px</Label>
                        <Slider
                          value={[style.shadowBlur]}
                          onValueChange={([v]) => setStyle({ ...style, shadowBlur: v })}
                          min={0}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 文字颜色 */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">文字颜色</CardTitle>
                      <CardDescription>调整卡片内文字颜色</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-foreground">文字颜色</Label>
                        <div className="flex gap-3">
                          <Input
                            type="color"
                            value={style.textColor}
                            onChange={(e) => setStyle({ ...style, textColor: e.target.value })}
                            className="w-16 h-10 rounded-lg cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={style.textColor}
                            onChange={(e) => setStyle({ ...style, textColor: e.target.value })}
                            className="flex-1 rounded-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="presets" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {presetStyles.map((preset, index) => (
                      <Card
                        key={index}
                        className="glass-card cursor-pointer transition-all hover:scale-105"
                        onClick={() => applyPreset(preset.style)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{preset.name}</CardTitle>
                          <CardDescription>点击应用此预设</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div
                            className="h-20 rounded-lg"
                            style={{
                              background: hexToRgba(preset.style.bgColor, preset.style.bgAlpha),
                              backdropFilter: `blur(${preset.style.blur}px)`,
                              border: `${preset.style.borderWidth}px solid ${hexToRgba(preset.style.borderColor, preset.style.borderAlpha)}`,
                              borderRadius: `${preset.style.borderRadius}px`,
                            }}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* 右侧：预览和代码 */}
            <div className="space-y-6">
              {/* 预览区域 */}
              <Card className="glass-card overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        实时预览
                      </CardTitle>
                      <CardDescription>查看你的毛玻璃效果</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400">
                    {/* 装饰元素 */}
                    <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/30 blur-xl" />
                    <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-yellow-300/40 blur-xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-pink-300/30 blur-lg" />
                    
                    {/* 毛玻璃卡片预览 */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-6 transition-all duration-300"
                      style={previewStyle}
                    >
                      <h3 className="text-xl font-bold mb-2">毛玻璃效果</h3>
                      <p className="text-sm opacity-80 mb-4">
                        这是你的自定义毛玻璃效果预览。调整左侧参数查看实时变化。
                      </p>
                      <Button
                        size="sm"
                        className="w-full rounded-full"
                        style={{
                          background: style.textColor,
                          color: style.bgColor,
                        }}
                      >
                        示例按钮
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CSS 代码 */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">CSS 代码</CardTitle>
                      <CardDescription>复制并粘贴到你的项目中</CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass rounded-full"
                      onClick={() => copyToClipboard(generateCSS())}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-background/50 rounded-lg p-4 overflow-x-auto text-sm text-foreground">
                    <code>{generateCSS()}</code>
                  </pre>
                </CardContent>
              </Card>

              {/* Tailwind 代码 */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Tailwind 类名</CardTitle>
                      <CardDescription>适用于 Tailwind CSS 项目</CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass rounded-full"
                      onClick={() => copyToClipboard(generateTailwind())}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-background/50 rounded-lg p-4 overflow-x-auto text-sm text-foreground break-all">
                    <code>{generateTailwind()}</code>
                  </pre>
                </CardContent>
              </Card>

              {/* 重置按钮 */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 glass bg-primary/80 hover:bg-primary text-primary-foreground rounded-full"
                  onClick={() => setStyle(defaultStyle)}
                >
                  重置为默认
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 glass text-foreground border-foreground/30 hover:bg-white/20 rounded-full"
                  onClick={() => copyToClipboard(JSON.stringify(style, null, 2))}
                >
                  导出配置
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* 页脚 */}
        <footer className="glass mt-16 mx-4 mb-4 rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-foreground/60">
            <p>© 2024 AquaGlass 设计器 · 创造属于你的毛玻璃美学</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
