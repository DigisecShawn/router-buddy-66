import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // 檢查是否已登入
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // 監聽認證狀態變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // 登入
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("帳號或密碼錯誤");
          } else {
            setError(error.message);
          }
          return;
        }

        toast({
          title: "登入成功",
          description: "歡迎回來！",
        });
      } else {
        // 註冊
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            setError("此帳號已被註冊");
          } else {
            setError(error.message);
          }
          return;
        }

        toast({
          title: "註冊成功",
          description: "帳號已創建，正在登入...",
        });
      }
    } catch (err: any) {
      setError(err.message || "發生錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto shadow-glow">
            <Wifi className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">路由器管理系統</h1>
          <p className="text-muted-foreground">網路資訊開發公司</p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isLogin ? "登入" : "註冊"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? "使用您的帳號登入系統" : "創建新的管理員帳號"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">電子郵件</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密碼</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                />
                {!isLogin && (
                  <p className="text-xs text-muted-foreground">密碼至少需要 6 個字元</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary text-white hover:opacity-90"
                disabled={loading}
              >
                {loading ? "處理中..." : isLogin ? "登入" : "註冊"}
              </Button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-sm text-primary hover:underline"
                  disabled={loading}
                >
                  {isLogin ? "還沒有帳號？立即註冊" : "已有帳號？立即登入"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 網路資訊開發公司 版權所有</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
