"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Droplets,
  Gauge,
  Zap,
  TrendingUp,
  CheckCircle,
  Cloud,
  Leaf,
  Settings,
  Bell,
  AlertTriangle,
  Info,
  X,
  Menu,
  Home,
  HelpCircle,
  Trophy,
  Star,
  Award,
  Gamepad2,
  TreePine,
  Recycle,
  GraduationCap,
  Building2,
  Sparkles,
  User,
  LogOut,
} from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "error" | "info"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

// Mock data for demonstration
const waterQualityData = [
  { time: "00:00", ph: 7.2, turbidity: 2.1, tds: 145, temp: 22 },
  { time: "04:00", ph: 7.1, turbidity: 2.3, tds: 148, temp: 21 },
  { time: "08:00", ph: 7.3, turbidity: 1.9, tds: 142, temp: 23 },
  { time: "12:00", ph: 7.2, turbidity: 2.0, tds: 146, temp: 25 },
  { time: "16:00", ph: 7.4, turbidity: 1.8, tds: 140, temp: 24 },
  { time: "20:00", ph: 7.2, turbidity: 2.2, tds: 147, temp: 22 },
]

const storageData = [
  { month: "Jan", collected: 1200, used: 980, saved: 220 },
  { month: "Feb", collected: 1100, used: 890, saved: 210 },
  { month: "Mar", collected: 1400, used: 1100, saved: 300 },
  { month: "Apr", collected: 1600, used: 1250, saved: 350 },
  { month: "May", collected: 1800, used: 1400, saved: 400 },
  { month: "Jun", collected: 2200, used: 1700, saved: 500 },
]

const usageDistribution = [
  { name: "Irrigation", value: 45, color: "var(--chart-1)" },
  { name: "Washrooms", value: 30, color: "var(--chart-2)" },
  { name: "Cooling Systems", value: 15, color: "var(--chart-3)" },
  { name: "Laboratory", value: 10, color: "var(--chart-4)" },
]

const ecoPoints = 2847
const currentLevel = "Eco Champion"
const nextLevelPoints = 3000
const achievements = [
  { id: 1, name: "Water Saver", description: "Saved 1000L of water", icon: Droplets, earned: true },
  { id: 2, name: "Green Guardian", description: "Reduced 1T CO₂", icon: Leaf, earned: true },
  { id: 3, name: "Campus Hero", description: "Top contributor this month", icon: Trophy, earned: true },
  { id: 4, name: "Eco Master", description: "Reach 5000 eco points", icon: Star, earned: false },
]

const campusLeaderboard = [
  { rank: 1, department: "Engineering Block", points: 4250, savings: "15,200L" },
  { rank: 2, department: "Science Block", points: 3890, savings: "13,800L" },
  { rank: 3, department: "Admin Block", points: 3420, savings: "12,100L" },
  { rank: 4, department: "Library", points: 2847, savings: "10,200L", current: true },
]

const impactCounters = {
  totalLitresSaved: 45280,
  co2Reduced: 8.7,
  moneySaved: 28400,
  treesEquivalent: 12,
}

export default function RainwaterDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemStatus, setSystemStatus] = useState("optimal")
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Added login state
  const [userProfile, setUserProfile] = useState({
    // Added user profile
    name: "Alex Johnson",
    role: "Environmental Coordinator",
    department: "Library",
    avatar: "/diverse-user-avatars.png",
  })
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "System Operational",
      message: "All systems running smoothly. Water quality within safe parameters.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "Maintenance Scheduled",
      message: "Routine filter cleaning scheduled for next week.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Weather Alert",
      message: "Heavy rainfall expected tomorrow. Prepare additional storage.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
    },
  ])
  const [activeAlert, setActiveAlert] = useState<Notification | null>(notifications[0])

  const [animatedCounters, setAnimatedCounters] = useState({
    litres: 0,
    co2: 0,
    money: 0,
    trees: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    const animateCounters = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const counterTimer = setInterval(() => {
        step++
        const progress = step / steps

        setAnimatedCounters({
          litres: Math.floor(impactCounters.totalLitresSaved * progress),
          co2: Math.floor(impactCounters.co2Reduced * progress * 10) / 10,
          money: Math.floor(impactCounters.moneySaved * progress),
          trees: Math.floor(impactCounters.treesEquivalent * progress),
        })

        if (step >= steps) {
          clearInterval(counterTimer)
          setAnimatedCounters({
            litres: impactCounters.totalLitresSaved,
            co2: impactCounters.co2Reduced,
            money: impactCounters.moneySaved,
            trees: impactCounters.treesEquivalent,
          })
        }
      }, stepDuration)
    }

    animateCounters()
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800"
      case "warning":
        return "border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800"
      case "error":
        return "border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800"
      case "info":
        return "border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800"
      default:
        return "border-gray-200 bg-gray-50 dark:bg-gray-950 dark:border-gray-800"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const dismissAlert = () => {
    setActiveAlert(null)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <img
                  src="/ecox-logo.png"
                  alt="EcoX - Rainwater Harvesting and Purification System"
                  className="h-12 w-auto"
                />
                <div className="hidden sm:block">
                  <p className="text-sm text-muted-foreground">
                    Smart Rainwater Harvesting System • Level: {currentLevel}
                  </p>
                </div>
              </div>

              <nav className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Gamepad2 className="h-4 w-4" />
                  <span>Eco Game</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>Leaderboard</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Learn</span>
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 px-3 py-2 rounded-full border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{ecoPoints} Eco Points</span>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{currentTime.toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">{currentTime.toLocaleTimeString()}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start space-y-1 p-3"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-center space-x-2 w-full">
                        {getAlertIcon(notification.type)}
                        <span className="font-medium text-sm">{notification.title}</span>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.timestamp.toLocaleTimeString()}</p>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center">
                    <span className="text-sm text-muted-foreground">View all notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus)} animate-pulse`} />

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                      <img
                        src={userProfile.avatar || "/placeholder.svg"}
                        alt="User avatar"
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="hidden sm:inline">{userProfile.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{userProfile.name}</p>
                        <p className="text-xs text-muted-foreground">{userProfile.role}</p>
                        <p className="text-xs text-muted-foreground">{userProfile.department}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help & Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Sign In
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Eco Game
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trophy className="h-4 w-4 mr-2" />
                    Leaderboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Learn
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {isLoggedIn && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
              Welcome back, {userProfile.name}! 👋
            </h2>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Your {userProfile.department} is currently ranked #4 in the campus leaderboard. Keep up the great work!
            </p>
          </div>
        )}

        {activeAlert && (
          <Alert className={getAlertStyles(activeAlert.type)}>
            {getAlertIcon(activeAlert.type)}
            <AlertDescription className="flex items-center justify-between">
              <div>
                <span className="font-medium">{activeAlert.title}: </span>
                {activeAlert.message}
              </div>
              <Button variant="ghost" size="sm" onClick={dismissAlert} className="ml-4 h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Eco Points & Level Progress */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Your Eco Progress</span>
              </CardTitle>
              <CardDescription>Level up by saving more water!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{ecoPoints}</div>
                <p className="text-sm text-muted-foreground">Eco Points</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{currentLevel}</span>
                  <span>{nextLevelPoints - ecoPoints} to next level</span>
                </div>
                <Progress value={(ecoPoints / nextLevelPoints) * 100} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {achievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-2 rounded-lg border text-center ${
                      achievement.earned
                        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800 opacity-50"
                    }`}
                  >
                    <achievement.icon
                      className={`h-4 w-4 mx-auto mb-1 ${achievement.earned ? "text-emerald-600" : "text-gray-400"}`}
                    />
                    <p className="text-xs font-medium">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impact Visualization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <span>🌍 Your Environmental Impact</span>
              </CardTitle>
              <CardDescription>Real-time impact of our campus water conservation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{animatedCounters.litres.toLocaleString()}L</div>
                  <p className="text-xs text-muted-foreground">Water Saved</p>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <TreePine className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{animatedCounters.co2}T</div>
                  <p className="text-xs text-muted-foreground">CO₂ Reduced</p>
                </div>

                <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <Recycle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-600">₹{animatedCounters.money.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Money Saved</p>
                </div>

                <div className="text-center p-4 bg-teal-50 dark:bg-teal-950 rounded-lg border border-teal-200 dark:border-teal-800">
                  <TreePine className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-teal-600">{animatedCounters.trees}</div>
                  <p className="text-xs text-muted-foreground">Trees Equivalent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              <span>🏆 Campus Leaderboard</span>
            </CardTitle>
            <CardDescription>See how your department ranks in water conservation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campusLeaderboard.map((dept) => (
                <div
                  key={dept.rank}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    dept.current
                      ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800"
                      : "bg-card"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        dept.rank === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : dept.rank === 2
                            ? "bg-gray-100 text-gray-800"
                            : dept.rank === 3
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {dept.rank}
                    </div>
                    <div>
                      <p className="font-medium">{dept.department}</p>
                      <p className="text-sm text-muted-foreground">{dept.savings} saved this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">{dept.points}</div>
                    <p className="text-xs text-muted-foreground">eco points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Cards - Enhanced with student-friendly icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">💧 Current Storage</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8,450L</div>
              <div className="mt-2">
                <Progress value={84} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">84% capacity • Excellent!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">✨ Water Quality</CardTitle>
              <Gauge className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Excellent</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  pH 7.2 ✓
                </Badge>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  Safe ✓
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">🌧️ Today's Collection</CardTitle>
              <Cloud className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">245L</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from yesterday 📈
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">🌱 Environmental Impact</CardTitle>
              <Leaf className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">2.1T</div>
              <p className="text-xs text-muted-foreground">CO₂ saved this month 🌍</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs - Enhanced with student-friendly labels */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="quality">💧 Quality</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            <TabsTrigger value="insights">🤖 AI Insights</TabsTrigger>
            <TabsTrigger value="game">🎮 Eco Game</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Storage Levels */}
              <Card>
                <CardHeader>
                  <CardTitle>📊 Storage & Usage Trends</CardTitle>
                  <CardDescription>Monthly water collection and usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={storageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="collected"
                        stackId="1"
                        stroke="var(--chart-1)"
                        fill="var(--chart-1)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="used"
                        stackId="2"
                        stroke="var(--chart-2)"
                        fill="var(--chart-2)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Usage Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>🔄 Water Usage Distribution</CardTitle>
                  <CardDescription>How harvested water is being utilized</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={usageDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {usageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {usageDistribution.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>💧 Real-time Water Quality Monitoring</CardTitle>
                <CardDescription>Live sensor data from filtration system</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="ph"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      name="pH Level"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="turbidity"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      name="Turbidity (NTU)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="tds"
                      stroke="var(--chart-3)"
                      strokeWidth={2}
                      name="TDS (ppm)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="temp"
                      stroke="var(--chart-4)"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🧪 pH Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">7.2</div>
                  <Progress value={72} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">Optimal range: 6.5-8.5 ✅</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🌊 Turbidity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">2.0 NTU</div>
                  <Progress value={20} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">Target: &lt;4 NTU ✅</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⚗️ TDS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">145 ppm</div>
                  <Progress value={29} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">Safe range: &lt;500 ppm ✅</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>📈 Monthly Collection Efficiency</CardTitle>
                  <CardDescription>Rainfall vs. water collected comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={storageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="collected" fill="var(--chart-1)" name="Collected (L)" />
                      <Bar dataKey="saved" fill="var(--chart-2)" name="Groundwater Saved (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>⚡ System Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Collection Efficiency</span>
                    <span className="text-sm font-bold text-green-600">87% 🎯</span>
                  </div>
                  <Progress value={87} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Filtration Rate</span>
                    <span className="text-sm font-bold text-blue-600">95% ✨</span>
                  </div>
                  <Progress value={95} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">System Uptime</span>
                    <span className="text-sm font-bold text-green-600">99.2% 🚀</span>
                  </div>
                  <Progress value={99} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Energy Efficiency</span>
                    <span className="text-sm font-bold text-green-600">92% 🌱</span>
                  </div>
                  <Progress value={92} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>🤖 AI Recommendations</span>
                  </CardTitle>
                  <CardDescription>Smart insights based on data analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">🌧️ Optimal Collection Window</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Weather forecast shows 15mm rainfall expected tomorrow. Prepare additional storage capacity.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">🔧 Maintenance Alert</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Filter efficiency at 95%. Schedule cleaning in 3 days for optimal performance.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">💡 Usage Optimization</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                      Irrigation usage can be reduced by 12% using smart scheduling based on soil moisture data.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🌍 Environmental Impact Forecast</CardTitle>
                  <CardDescription>Projected sustainability benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">12,500L</div>
                    <p className="text-sm text-muted-foreground">Projected monthly collection 📊</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">3.2T</div>
                      <p className="text-xs text-muted-foreground">CO₂ Reduction 🌱</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">₹8,400</div>
                      <p className="text-xs text-muted-foreground">Cost Savings 💰</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Groundwater Conservation</span>
                      <span className="font-semibold">89% 💧</span>
                    </div>
                    <Progress value={89} />

                    <div className="flex justify-between text-sm">
                      <span>Campus Water Independence</span>
                      <span className="font-semibold">67% 🏫</span>
                    </div>
                    <Progress value={67} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="game" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gamepad2 className="h-5 w-5 text-purple-500" />
                    <span>🎮 Eco Challenges</span>
                  </CardTitle>
                  <CardDescription>Complete challenges to earn eco points!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200">💧 Water Saver Challenge</h4>
                      <Badge className="bg-purple-100 text-purple-800">+50 points</Badge>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">Save 500L of water this week</p>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">390L / 500L completed</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-800 dark:text-green-200">🌱 Green Guardian</h4>
                      <Badge className="bg-green-100 text-green-800">+100 points</Badge>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                      Maintain excellent water quality for 7 days
                    </p>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-emerald-600 mt-1">✅ Challenge Complete!</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">🏆 Department Champion</h4>
                      <Badge className="bg-blue-100 text-blue-800">+200 points</Badge>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">Be top department this month</p>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Currently #4 - Keep going!</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span>🏅 Achievement Gallery</span>
                  </CardTitle>
                  <CardDescription>Your earned badges and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border text-center transition-all ${
                          achievement.earned
                            ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-950 dark:to-orange-950 dark:border-yellow-800 shadow-md"
                            : "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800 opacity-50"
                        }`}
                      >
                        <achievement.icon
                          className={`h-8 w-8 mx-auto mb-2 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`}
                        />
                        <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && <Badge className="mt-2 bg-yellow-100 text-yellow-800">Earned!</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
