import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Heart, Book, Smile, Frown, Shield, User, LogOut, Menu, X, Check, 
  Search, Calendar, BarChart2, ArrowRight, Activity, Moon, Sun, 
  Wind, AlertCircle, FileText, Download, Users, Key, Link as LinkIcon, Lock,
  Plus, Edit2, Trash2, HeartHandshake, Phone, Home, MapPin, CheckCircle2
} from 'lucide-react';

const mockDbtSkills = [
  { id: 's1', name: 'STOP', category: 'Distress Tolerance', time: '1 min', desc: 'Stop, Take a breath, Observe, Proceed mindfully.' },
  { id: 's2', name: 'Wise Mind', category: 'Mindfulness', time: '5 min', desc: 'Finding the balance between reasonable mind and emotion mind.' },
  { id: 's3', name: 'Check the Facts', category: 'Emotion Regulation', time: '10 min', desc: 'Look at the facts to reduce emotional intensity.' },
  { id: 's4', name: 'DEAR MAN', category: 'Interpersonal', time: '15 min', desc: 'A framework for asking for what you want or saying no effectively.' },
];

const initialSafetyPlan = {
  warningSigns: '',
  copingStrategies: '',
  supportPeople: '',
  professionalContacts: '',
  safePlaces: ''
};

const AppContext = createContext();

const Logo = ({ type = 'full', className = '' }) => {
  // Membersihkan class bawaan gambar lama yang sudah tidak diperlukan teks
  const cleanClass = className.replace('brightness-0', '').replace('invert', '').trim();
  const isInverted = className.includes('invert');
  
  // Menyesuaikan ukuran teks secara proporsional sesuai kebutuhan setiap halaman
  let textSize = 'text-2xl';
  if (className.includes('h-10')) textSize = 'text-4xl';
  if (className.includes('h-9')) textSize = 'text-3xl';
  if (className.includes('h-6')) textSize = 'text-xl';

  return (
    <div className={`flex items-center select-none font-black tracking-tighter ${textSize} ${cleanClass}`}>
      {type === 'icon' ? (
        // Untuk logo versi kecil (biasanya di sidebar mobile psikiater)
        <span className={isInverted ? 'text-white' : 'text-[#F07C5F]'}>e.</span>
      ) : (
        // Untuk logo versi teks penuh yang rapi dan elegan
        <>
          <span className={isInverted ? 'text-white' : 'text-[#4A4A4A] dark:text-white'}>eazz</span>
          <span className={isInverted ? 'text-[#FFB870]' : 'text-[#F07C5F]'}>ie</span>
        </>
      )}
    </div>
  );
};

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useContext(AppContext);
  return (
    <button 
      onClick={toggleTheme} 
      className={`p-2 rounded-full bg-[#EAE6E1]/50 dark:bg-[#333333] text-[#4A4A4A] dark:text-[#EAE6E1] hover:bg-[#D0C9C0]/50 dark:hover:bg-[#444444] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F07C5F] ${className}`}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', icon: Icon, disabled = false }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#FFB870]";
  const variants = {
    primary: "bg-[#F07C5F] hover:bg-[#D96B50] text-white shadow-sm disabled:bg-[#D0C9C0] dark:disabled:bg-[#444444] disabled:cursor-not-allowed",
    secondary: "bg-[#FDF3E7] dark:bg-[#3A2A18] hover:bg-[#F4E3D1] dark:hover:bg-[#4A3420] text-[#4A4A4A] dark:text-[#FDF3E7] disabled:opacity-50",
    outline: "border border-[#EAE6E1] dark:border-[#444444] hover:bg-[#FFFDFA] dark:hover:bg-[#2C2C2C] text-[#4A4A4A] dark:text-[#EAE6E1] disabled:opacity-50",
    ghost: "hover:bg-[#FFFDFA] dark:hover:bg-[#2C2C2C] text-[#777777] dark:text-[#A0A0A0] hover:text-[#4A4A4A] dark:hover:text-[#EAE6E1] disabled:opacity-50",
    danger: "bg-transparent hover:bg-[#E76F51]/10 text-[#E76F51] border border-[#E76F51] disabled:opacity-50"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white dark:bg-[#1E1E1E] rounded-[20px] p-6 border border-[#EAE6E1] dark:border-[#333333] shadow-[0_2px_10px_rgba(74,74,74,0.03)] dark:shadow-none transition-colors ${onClick ? 'cursor-pointer hover:shadow-md dark:hover:border-[#555]' : ''} ${className}`}>
    {children}
  </div>
);

const Input = ({ label, type = 'text', placeholder, value, onChange, className = '', helperText, required = false }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-sm font-medium text-[#4A4A4A] dark:text-[#EAE6E1]">{label} {required && <span className="text-[#E76F51]">*</span>}</label>}
    <input 
      type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
      className="px-4 py-3 rounded-xl border border-[#EAE6E1] dark:border-[#444444] bg-white dark:bg-[#1E1E1E] text-[#4A4A4A] dark:text-[#EAE6E1] placeholder-[#D0C9C0] dark:placeholder-[#666666] focus:outline-none focus:border-[#F07C5F] focus:ring-1 focus:ring-[#F07C5F] transition-colors"
    />
    {helperText && <span className="text-xs text-[#777777] dark:text-[#A0A0A0]">{helperText}</span>}
  </div>
);

const Badge = ({ children, variant = 'gray' }) => {
  const variants = {
    gray: "bg-[#F9F8F6] dark:bg-[#2C2C2C] text-[#777777] dark:text-[#CCCCCC]",
    primary: "bg-[#F07C5F]/10 dark:bg-[#F07C5F]/20 text-[#D96B50] dark:text-[#F07C5F]",
    alert: "bg-[#E76F51]/10 dark:bg-[#E76F51]/20 text-[#E76F51] dark:text-[#FF8A6E]",
    secondary: "bg-[#FFB870]/20 dark:bg-[#FFB870]/10 text-[#4A4A4A] dark:text-[#FFB870]",
    success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const EmptyState = ({ icon: Icon, title, description, action, actionText }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed border-[#EAE6E1] dark:border-[#333333] rounded-[24px] bg-[#FFFDFA]/50 dark:bg-[#121212]/50 transition-colors">
    <div className="w-16 h-16 rounded-full bg-white dark:bg-[#2C2C2C] flex items-center justify-center text-[#D0C9C0] dark:text-[#777777] mb-4 shadow-sm">
      <Icon size={32} />
    </div>
    <h3 className="text-lg font-bold text-[#4A4A4A] dark:text-[#EAE6E1] mb-2">{title}</h3>
    <p className="text-sm text-[#777777] dark:text-[#A0A0A0] max-w-md mb-6 leading-relaxed">{description}</p>
    {action && <Button onClick={action}>{actionText}</Button>}
  </div>
);

const LandingPage = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="min-h-screen bg-[#FFFDFA] dark:bg-[#121212] font-sans selection:bg-[#F07C5F] selection:text-white transition-colors duration-300">
      <nav className="sticky top-0 z-50 bg-[#FFFDFA]/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-[#EAE6E1] dark:border-[#333333]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigate('landing')}>
            <Logo type="full" className="h-10" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button variant="ghost" className="hidden md:flex" onClick={() => navigate('login')}>Log in</Button>
            <Button onClick={() => navigate('register')}>Get Started</Button>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div>
            <p className="text-[#F07C5F] font-semibold tracking-wide uppercase text-sm mb-4">Your personal space to pause, reflect, and grow.</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1] leading-[1.15] tracking-tight">
              Understand your emotions, <br/><span className="text-[#F07C5F]">one gentle step at a time.</span>
            </h1>
          </div>
          <p className="text-lg text-[#777777] dark:text-[#A0A0A0] leading-relaxed max-w-xl">
            Track your mood, practice DBT skills, write without judgment, and share meaningful progress with your psychiatrist when you choose.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button onClick={() => navigate('register')} className="px-8 py-4 text-base">Start Your Journey</Button>
            <p className="text-sm text-[#D0C9C0] dark:text-[#777777] font-medium flex items-center gap-2">
              <Lock size={14}/> Private by default. You decide what to share.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const AuthPage = ({ type = 'login' }) => {
  const { register, login, navigate } = useContext(AppContext);
  const [role, setRole] = useState('patient');
  
  const [name, setName] = useState('');
  
  // Mengambil email dan password terakhir yang disave dari localStorage (Auto-fill)
  const [email, setEmail] = useState(() => localStorage.getItem('eazzie_saved_email') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('eazzie_saved_password') || '');
  const [rememberMe, setRememberMe] = useState(true); 
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (type === 'register') {
      if (!name || !email || !password) {
        setErrorMsg('Please fill in all fields.');
        return;
      }
      
      // AUTO-SAVE CREDENTIALS SAAT DAFTAR!
      localStorage.setItem('eazzie_saved_email', email);
      localStorage.setItem('eazzie_saved_password', password);
      
      register({ name, email, password, role });
    } else {
      if (!email || !password) {
        setErrorMsg('Please enter your email and password.');
        return;
      }
      
      if (rememberMe) {
        localStorage.setItem('eazzie_saved_email', email);
        localStorage.setItem('eazzie_saved_password', password);
      }
      
      const success = login(email, password, role, rememberMe);
      if (!success) {
        setErrorMsg('Account not found or password incorrect. Have you registered?');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FFFDFA] dark:bg-[#121212] transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50">
         <ThemeToggle />
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#F07C5F] to-[#FFB870] dark:from-[#D96B50] dark:to-[#CC925A] flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        <div className="relative z-10 cursor-pointer" onClick={() => navigate('landing')}>
          <div className="bg-white/90 p-3 rounded-2xl inline-block">
             <Logo type="full" className="h-8" />
          </div>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold leading-tight mb-6 text-white">"Every small note, every moment of pause, is a step forward."</h2>
          <p className="text-white/80 text-lg">A gentle space to track, reflect, and connect.</p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 animate-in fade-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-6">
               <Logo type="full" className="h-10" />
            </div>
            <h1 className="text-3xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1] mb-2">{type === 'login' ? 'Welcome back' : 'Create your space'}</h1>
            <p className="text-[#777777] dark:text-[#A0A0A0]">
              {type === 'login' ? 'Please enter your details to sign in.' : 'Begin your journey with a private account.'}
            </p>
          </div>

          <div className="flex bg-[#EAE6E1]/50 dark:bg-[#2C2C2C] p-1 rounded-xl mb-6">
            <button 
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'patient' ? 'bg-white dark:bg-[#444444] text-[#4A4A4A] dark:text-white shadow-sm' : 'text-[#777777] dark:text-[#A0A0A0] hover:text-[#4A4A4A] dark:hover:text-white'}`}
              onClick={() => { setRole('patient'); setErrorMsg(''); }}
            >For Me (Patient)</button>
            <button 
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'psychiatrist' ? 'bg-white dark:bg-[#444444] text-[#4A4A4A] dark:text-white shadow-sm' : 'text-[#777777] dark:text-[#A0A0A0] hover:text-[#4A4A4A] dark:hover:text-white'}`}
              onClick={() => { setRole('psychiatrist'); setErrorMsg(''); }}
            >For Psychiatrists</button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-[#E76F51]/10 border border-[#E76F51]/30 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-[#E76F51] mt-0.5" />
              <p className="text-sm text-[#E76F51]">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {type === 'register' && (
              <Input label="Display Name" placeholder="How should we call you?" value={name} onChange={(e) => setName(e.target.value)} required />
            )}
            <Input label="Email address" type="email" placeholder="hello@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            
            {type === 'login' && (
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#EAE6E1] dark:border-[#444444] dark:bg-[#1E1E1E] text-[#F07C5F] focus:ring-[#F07C5F]"
                />
                <label htmlFor="remember" className="text-sm text-[#777777] dark:text-[#A0A0A0] cursor-pointer">Remember me (save login)</label>
              </div>
            )}

            <Button type="submit" className="w-full py-3 text-lg mt-2">
              {type === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#777777] dark:text-[#A0A0A0] mt-8">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <span 
              className="text-[#F07C5F] font-medium cursor-pointer hover:underline"
              onClick={() => { navigate(type === 'login' ? 'register' : 'login'); setErrorMsg(''); }}
            >
              {type === 'login' ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const PatientLayout = ({ children }) => {
  const { user, logout, navigate, currentRoute } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'patient-dash', label: 'Overview', icon: Activity },
    { id: 'patient-mood', label: 'Mood Tracker', icon: Smile },
    { id: 'patient-journal', label: 'Journal', icon: Book },
    { id: 'patient-dbt', label: 'DBT Tools', icon: Heart },
    { id: 'patient-safety', label: 'Safety Plan', icon: Shield },
    { id: 'patient-psychiatrist', label: 'My Psychiatrist', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFA] dark:bg-[#121212] flex flex-col md:flex-row transition-colors duration-300">
      <div className="md:hidden bg-white dark:bg-[#1E1E1E] border-b border-[#EAE6E1] dark:border-[#333333] p-4 flex justify-between items-center sticky top-0 z-40 transition-colors">
        <div className="flex items-center gap-2 font-bold text-lg text-[#4A4A4A]">
          <Logo type="full" className="h-8" />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#4A4A4A] dark:text-[#EAE6E1]">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white dark:bg-[#1E1E1E] border-r border-[#EAE6E1] dark:border-[#333333] flex-shrink-0 fixed md:sticky top-[65px] md:top-0 h-[calc(100vh-65px)] md:h-screen z-30 flex flex-col transition-colors`}>
        <div className="p-6 hidden md:flex justify-between items-center cursor-pointer">
          <div onClick={() => navigate('patient-dash')}><Logo type="full" className="h-9" /></div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const active = currentRoute === item.id || (currentRoute === 'patient-mood-list' && item.id === 'patient-mood');
            return (
              <button 
                key={item.id}
                onClick={() => { navigate(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? 'bg-[#F07C5F]/10 dark:bg-[#F07C5F]/20 text-[#D96B50] dark:text-[#F07C5F]' : 'text-[#777777] dark:text-[#A0A0A0] hover:bg-[#FFFDFA] dark:hover:bg-[#2C2C2C] hover:text-[#4A4A4A] dark:hover:text-[#EAE6E1]'
                }`}
              >
                <item.icon size={18} className={active ? 'text-[#F07C5F]' : ''} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-[#EAE6E1] dark:border-[#333333]">
          <div className="flex items-center justify-between px-2 mb-4 hidden md:flex">
             <span className="text-xs font-medium text-[#777777] dark:text-[#A0A0A0]">Theme</span>
             <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-[#FDF3E7] dark:bg-[#3A2A18] rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center text-[#D96B50] dark:text-[#F07C5F] font-semibold uppercase shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div className="text-left flex-1 overflow-hidden">
              <p className="text-sm font-medium text-[#4A4A4A] dark:text-[#EAE6E1] truncate">{user.name}</p>
              <p className="text-xs text-[#777777] dark:text-[#A0A0A0]">Patient Space</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-[#E76F51] border border-transparent hover:border-[#E76F51]/30 hover:bg-[#E76F51]/10 rounded-xl transition-all">
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
};

const PatientDashboard = () => {
  const { user, navigate, state } = useContext(AppContext);
  const { moodLogs } = state;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Welcome to your space, {user.name}.</h1>
        <p className="text-[#777777] dark:text-[#A0A0A0]">How are you arriving today?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-br from-[#F07C5F] to-[#D96B50] text-white border-none relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-2 text-white">Ready for a check-in?</h2>
            <p className="text-white/80 text-sm mb-6 max-w-sm">Taking a moment to notice your feelings is a gentle way to care for yourself today.</p>
          </div>
          <Button variant="secondary" className="w-fit" onClick={() => navigate('patient-mood')}>Start Check-in</Button>
        </Card>

        <div className="space-y-6">
           <Card className="bg-[#FDF3E7]/50 dark:bg-[#3A2A18]/50 border-none flex items-center gap-4 cursor-pointer hover:bg-[#FDF3E7] dark:hover:bg-[#3A2A18]" onClick={() => navigate('patient-journal')}>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center text-[#D96B50] dark:text-[#F07C5F] shadow-sm"><Book size={20}/></div>
            <div>
              <p className="text-sm font-semibold text-[#4A4A4A] dark:text-[#EAE6E1]">Gratitude</p>
              <p className="text-xs text-[#777777] dark:text-[#A0A0A0]">Notice what felt kind today.</p>
            </div>
          </Card>
          <Card className="bg-[#FFB870]/10 border-none flex items-center gap-4 cursor-pointer hover:bg-[#FFB870]/20" onClick={() => navigate('patient-dbt')}>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center text-[#D96B50] dark:text-[#F07C5F] shadow-sm"><Wind size={20}/></div>
            <div>
              <p className="text-sm font-semibold text-[#4A4A4A] dark:text-[#EAE6E1]">Need a pause?</p>
              <p className="text-xs text-[#777777] dark:text-[#A0A0A0]">Try a brief mindfulness skill.</p>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Recent Pattern</h3>
          <span className="text-xs text-[#777777] dark:text-[#A0A0A0]">Last 7 days</span>
        </div>
        {moodLogs.length === 0 ? (
          <EmptyState 
            icon={Activity}
            title="No data yet"
            description="Your check-in patterns will appear here once you start logging your mood. There's no rush to begin."
          />
        ) : (
          <Card>
            <p className="text-sm text-[#777777] dark:text-[#A0A0A0] text-center py-8">Chart data will appear here.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

const PatientMoodTracker = () => {
  const { navigate, addMoodLog } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(null); 
  const [note, setNote] = useState('');
  const [emotions, setEmotions] = useState([]);

  const scaleOptions = [-3, -2, -1, 0, 1, 2, 3];
  
  const getScaleColor = (val) => {
    if (val < 0) return 'text-[#E76F51] hover:bg-[#E76F51]/10 border-[#E76F51]/30 dark:hover:bg-[#E76F51]/20'; 
    if (val === 0) return 'text-[#777777] dark:text-[#A0A0A0] hover:bg-[#EAE6E1]/50 dark:hover:bg-[#333333] border-[#EAE6E1] dark:border-[#444444]'; 
    return 'text-[#F07C5F] hover:bg-[#F07C5F]/10 border-[#F07C5F]/30 dark:hover:bg-[#F07C5F]/20'; 
  };

  const toggleEmotion = (e) => {
    setEmotions(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);
  };

  const handleSave = () => {
    if (note.trim() === '') return;
    addMoodLog({
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      score,
      emotions,
      note
    });
    navigate('patient-mood-list');
  };

  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">New Check-in</h1>
          <Button variant="ghost" onClick={() => navigate('patient-mood-list')}>View History</Button>
        </div>
        <Card className="min-h-[400px] flex flex-col justify-center text-center animate-in fade-in">
          <h2 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1] mb-2">How does this moment feel?</h2>
          <p className="text-sm text-[#777777] dark:text-[#A0A0A0] mb-8">-3 is very difficult, 0 is neutral, +3 is very good.</p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 py-8">
            {scaleOptions.map(i => (
              <button 
                key={i} 
                onClick={() => setScore(i)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full text-lg font-medium border-2 transition-all duration-300 flex items-center justify-center
                  ${score === i 
                    ? (i < 0 ? 'bg-[#E76F51] text-white border-[#E76F51] shadow-md scale-110' : 
                       i === 0 ? 'bg-[#D0C9C0] dark:bg-[#666666] text-white border-[#D0C9C0] dark:border-[#666666] shadow-md scale-110' : 
                       'bg-[#F07C5F] text-white border-[#F07C5F] shadow-md scale-110')
                    : `bg-white dark:bg-[#1E1E1E] ${getScaleColor(i)}`
                  }`}
              >
                {i > 0 ? `+${i}` : i}
              </button>
            ))}
          </div>
          
          <div className="pt-8 flex justify-center">
            <Button disabled={score === null} onClick={() => setStep(2)} className="w-full max-w-xs">Continue</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="animate-in slide-in-from-right-4">
        <h2 className="text-xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1] mb-1">Add context to your check-in</h2>
        <p className="text-sm text-[#777777] dark:text-[#A0A0A0] mb-6">Writing down your thoughts is required. It helps you reflect on patterns later.</p>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#4A4A4A] dark:text-[#EAE6E1] flex items-center gap-1">
              Your note for today <span className="text-[#E76F51]">*</span>
            </label>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border resize-none h-32 focus:outline-none focus:ring-1 transition-colors bg-white dark:bg-[#1E1E1E] text-[#4A4A4A] dark:text-[#EAE6E1]
                ${note.trim() === '' ? 'border-[#E76F51] focus:border-[#E76F51] focus:ring-[#E76F51]' : 'border-[#EAE6E1] dark:border-[#444444] focus:border-[#F07C5F] focus:ring-[#F07C5F]'}`}
              placeholder="What's on your mind? (Required)"
            ></textarea>
            {note.trim() === '' && <span className="text-xs text-[#E76F51]">A small note is required to save this entry.</span>}
          </div>

          <div>
            <label className="text-sm font-medium text-[#4A4A4A] dark:text-[#EAE6E1] mb-2 block">What emotions are present? (Optional)</label>
            <div className="flex flex-wrap gap-2">
              {['Joy', 'Sadness', 'Anxiety', 'Anger', 'Calm', 'Numbness', 'Frustration', 'Hope'].map(e => (
                <button
                  key={e}
                  onClick={() => toggleEmotion(e)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    emotions.includes(e) 
                    ? 'bg-[#F07C5F] text-white border-[#F07C5F]' 
                    : 'bg-[#F9F8F6] dark:bg-[#2C2C2C] text-[#777777] dark:text-[#A0A0A0] border-transparent hover:border-[#EAE6E1] dark:hover:border-[#555]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-[#FFFDFA] dark:bg-[#121212] p-4 rounded-xl border border-[#EAE6E1] dark:border-[#333333] flex items-start gap-3 mt-4">
             <AlertCircle size={20} className="text-[#E76F51] mt-0.5" />
             <div>
               <p className="text-sm font-medium text-[#4A4A4A] dark:text-[#EAE6E1]">Are you feeling unsafe right now?</p>
               <p className="text-xs text-[#777777] dark:text-[#A0A0A0] mt-1">If you are having urges to hurt yourself, please check your Safety Plan or seek help.</p>
               <div className="flex gap-2 mt-3">
                 <Button variant="outline" className="py-1.5 px-3 text-xs" onClick={() => navigate('patient-safety')}>View Safety Plan</Button>
               </div>
             </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 mt-6 border-t border-[#EAE6E1] dark:border-[#333333]">
           <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
           <Button disabled={note.trim() === ''} onClick={handleSave}>Save Check-in</Button>
        </div>
      </Card>
    </div>
  );
};

const PatientMoodList = () => {
  const { state, navigate } = useContext(AppContext);
  const { moodLogs } = state;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Mood History</h1>
          <p className="text-[#777777] dark:text-[#A0A0A0]">Review your past check-ins and notes.</p>
        </div>
        <Button icon={Plus} onClick={() => navigate('patient-mood')}>New Check-in</Button>
      </div>

      {moodLogs.length === 0 ? (
        <EmptyState 
          icon={Calendar}
          title="No history yet"
          description="Your first check-in can begin whenever you are ready. Your history will appear here."
          action={() => navigate('patient-mood')}
          actionText="Start Check-in"
        />
      ) : (
        <div className="space-y-4">
          {[...moodLogs].reverse().map(log => (
            <Card key={log.id} className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                    ${log.score < 0 ? 'bg-[#E76F51]' : log.score === 0 ? 'bg-[#D0C9C0] dark:bg-[#666]' : 'bg-[#F07C5F]'}`}>
                    {log.score > 0 ? `+${log.score}` : log.score}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A4A4A] dark:text-[#EAE6E1]">{log.date}</p>
                    <div className="flex gap-1 mt-1">
                      {log.emotions.length > 0 ? log.emotions.map(e => <Badge key={e} variant="gray">{e}</Badge>) : <span className="text-xs text-[#D0C9C0] dark:text-[#666]">No emotions tagged</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFFDFA] dark:bg-[#2C2C2C] p-4 rounded-xl mt-2 border border-[#EAE6E1] dark:border-[#444]">
                <p className="text-sm text-[#4A4A4A] dark:text-[#EAE6E1] whitespace-pre-wrap leading-relaxed">{log.note}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const PatientSafetyPlan = () => {
  const { state, updateSafetyPlan } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(state.safetyPlan || initialSafetyPlan);

  const handleSave = () => {
    updateSafetyPlan(formData);
    setIsEditing(false);
  };

  const sections = [
    { id: 'warningSigns', title: '1. My Warning Signs', desc: 'Thoughts, images, mood, situation, or behavior that indicate a crisis may be developing.', icon: AlertCircle },
    { id: 'copingStrategies', title: '2. Things I can do by myself', desc: 'Internal coping strategies like relaxation techniques or activities to distract myself.', icon: Activity },
    { id: 'supportPeople', title: '3. People who can support me', desc: 'Friends or family members I can contact for distraction or support. (Include names and numbers)', icon: HeartHandshake },
    { id: 'professionalContacts', title: '4. Professional Contacts', desc: 'Clinicians, agencies, or crisis lines. (Include names and numbers)', icon: Phone },
    { id: 'safePlaces', title: '5. Safe Places', desc: 'Places I can go to feel safer and distracted.', icon: MapPin },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Safety Plan</h1>
          <p className="text-[#777777] dark:text-[#A0A0A0]">A written set of instructions to follow when feeling overwhelmed.</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" onClick={() => { setFormData(state.safetyPlan); setIsEditing(false); }}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button variant="outline" icon={Edit2} onClick={() => setIsEditing(true)}>Edit Plan</Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {sections.map(sec => (
          <Card key={sec.id} className="p-0 overflow-hidden">
            <div className="bg-[#FFFDFA] dark:bg-[#2C2C2C] px-6 py-4 border-b border-[#EAE6E1] dark:border-[#444] flex items-center gap-3">
              <sec.icon size={18} className="text-[#F07C5F]" />
              <div>
                <h3 className="font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">{sec.title}</h3>
                <p className="text-xs text-[#777777] dark:text-[#A0A0A0]">{sec.desc}</p>
              </div>
            </div>
            <div className="p-6">
              {isEditing ? (
                <textarea 
                  value={formData[sec.id]}
                  onChange={(e) => setFormData({...formData, [sec.id]: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-[#EAE6E1] dark:border-[#444] bg-white dark:bg-[#1E1E1E] text-[#4A4A4A] dark:text-[#EAE6E1] resize-none min-h-[100px] focus:outline-none focus:border-[#F07C5F] focus:ring-1 focus:ring-[#F07C5F]"
                  placeholder="Type your strategy or contacts here..."
                ></textarea>
              ) : (
                <div className="min-h-[60px]">
                  {state.safetyPlan && state.safetyPlan[sec.id] ? (
                     <p className="text-sm text-[#4A4A4A] dark:text-[#EAE6E1] whitespace-pre-wrap leading-relaxed">{state.safetyPlan[sec.id]}</p>
                  ) : (
                     <p className="text-sm text-[#D0C9C0] dark:text-[#666] italic">No entries yet. Edit your plan to add them.</p>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-[#E76F51]/10 dark:bg-[#E76F51]/20 border-[#E76F51]/30 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <div>
          <h3 className="font-bold text-[#E76F51] dark:text-[#FF8A6E]">Emergency Services</h3>
          <p className="text-sm text-[#4A4A4A] dark:text-[#EAE6E1]">If you are in immediate danger, please contact local emergency services immediately.</p>
        </div>
        <Button variant="danger">View Hotlines</Button>
      </Card>
    </div>
  );
};

const PatientJournal = () => {
  const { state, addJournal } = useContext(AppContext);
  const { journals } = state;
  const [isWriting, setIsWriting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title || !content) return;
    addJournal({
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleDateString()
    });
    setIsWriting(false);
    setTitle('');
    setContent('');
  };

  if (isWriting) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">New Journal Entry</h1>
          <Button variant="ghost" onClick={() => setIsWriting(false)}>Cancel</Button>
        </div>
        <Card>
          <Input 
            placeholder="Give your entry a title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="mb-6 font-bold text-lg"
          />
          <textarea 
            placeholder="This space is yours. Write whatever is on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-4 rounded-xl border border-[#EAE6E1] dark:border-[#444] bg-white dark:bg-[#1E1E1E] text-[#4A4A4A] dark:text-[#EAE6E1] resize-none focus:outline-none focus:border-[#F07C5F] focus:ring-1 focus:ring-[#F07C5F]"
          />
          <div className="flex justify-end mt-6">
            <Button disabled={!title || !content} onClick={handleSave}>Save Entry</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Journal Library</h1>
          <p className="text-[#777777] dark:text-[#A0A0A0]">A safe place for your thoughts.</p>
        </div>
        <Button icon={Plus} onClick={() => setIsWriting(true)}>New Entry</Button>
      </div>
      
      {journals.length === 0 ? (
        <EmptyState 
          icon={Edit2}
          title="Your space is empty"
          description="This space is yours. Write a sentence, a word, or simply begin with today."
          action={() => setIsWriting(true)}
          actionText="Write First Entry"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...journals].reverse().map(journal => (
            <Card key={journal.id} className="flex flex-col h-48">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#4A4A4A] dark:text-[#EAE6E1] truncate pr-2">{journal.title}</h3>
                <span className="text-xs text-[#D0C9C0] dark:text-[#666] shrink-0">{journal.date}</span>
              </div>
              <p className="text-sm text-[#777777] dark:text-[#A0A0A0] line-clamp-4 flex-1">{journal.content}</p>
              <div className="mt-4 pt-4 border-t border-[#EAE6E1] dark:border-[#333]">
                <Badge variant="gray">Private</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const PatientDBT = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  if (activeSkill) {
    return (
      <div className="max-w-2xl mx-auto py-8 animate-in slide-in-from-right-4">
        <Button variant="ghost" onClick={() => setActiveSkill(null)} className="mb-6 -ml-4">
          <ArrowRight className="rotate-180" size={16}/> Back to Library
        </Button>
        <Card className="text-center py-12 px-8">
          <Badge variant="primary" className="mb-6 inline-block">{activeSkill.category}</Badge>
          <h2 className="text-3xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1] mb-4">{activeSkill.name}</h2>
          <p className="text-[#777777] dark:text-[#A0A0A0] mb-12">{activeSkill.desc}</p>
          
          <div className="w-24 h-24 rounded-full bg-[#FDF3E7] dark:bg-[#3A2A18] mx-auto mb-12 flex items-center justify-center">
             <Wind size={40} className="text-[#F07C5F] animate-pulse" />
          </div>

          <p className="text-sm text-[#4A4A4A] dark:text-[#EAE6E1] mb-8">Take a moment to practice this skill. When you are done, log your practice.</p>
          
          <Button onClick={() => setActiveSkill(null)} icon={CheckCircle2} className="w-full sm:w-auto">
            I've Completed This Practice
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in">
       <header>
        <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">DBT Tools Library</h1>
        <p className="text-[#777777] dark:text-[#A0A0A0]">Choose a skill that fits what you need now. These are educational supports.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDbtSkills.map(skill => (
          <Card key={skill.id} className="flex flex-col">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="primary">{skill.category}</Badge>
                <span className="text-xs text-[#D0C9C0] dark:text-[#666] font-medium">{skill.time}</span>
              </div>
              <h3 className="text-lg font-bold text-[#4A4A4A] dark:text-[#EAE6E1] mb-2">{skill.name}</h3>
              <p className="text-sm text-[#777777] dark:text-[#A0A0A0] leading-relaxed">{skill.desc}</p>
            </div>
            <Button variant="outline" className="w-full mt-6" onClick={() => setActiveSkill(skill)}>
              Start Practice
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

const PatientPsychiatrist = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in">
       <header>
        <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">My Psychiatrist</h1>
        <p className="text-[#777777] dark:text-[#A0A0A0]">Connect with your psychiatrist to share your progress securely.</p>
      </header>

      <Card className="text-center py-12 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#FFFDFA] dark:bg-[#121212] flex items-center justify-center text-[#FFB870] mb-4">
          <LinkIcon size={32} />
        </div>
        <h2 className="text-xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1] mb-2">Connect when you are ready.</h2>
        <p className="text-sm text-[#777777] dark:text-[#A0A0A0] mb-8 max-w-md">
          You can use Eazzie independently or connect using a private code provided by your psychiatrist. Sharing is always based on your permission.
        </p>
        
        <div className="w-full max-w-sm space-y-4">
          <Input placeholder="Enter Psychiatrist Code (e.g. EAZ-123)" />
          <Button className="w-full">Check Code</Button>
        </div>
      </Card>
    </div>
  )
}

const PsychiatristLayout = ({ children }) => {
  const { user, logout, navigate, currentRoute } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'psych-dash', label: 'Overview', icon: Activity },
    { id: 'psych-patients', label: 'Patients', icon: Users },
    { id: 'psych-codes', label: 'Invite Codes', icon: Key },
    { id: 'psych-reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFA] dark:bg-[#121212] flex flex-col md:flex-row transition-colors duration-300">
      <div className="md:hidden bg-[#4A4A4A] dark:bg-[#111111] p-4 flex justify-between items-center sticky top-0 z-40 text-white transition-colors">
         <div className="flex items-center gap-2 font-bold text-lg">
          <Logo type="icon" className="h-6 brightness-0 invert" />
          <span>Eazzie Pro</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="!text-white hover:!bg-white/10" />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-[#4A4A4A] dark:bg-[#111111] text-white flex-shrink-0 fixed md:sticky top-[65px] md:top-0 h-[calc(100vh-65px)] md:h-screen z-30 flex flex-col shadow-xl transition-colors`}>
        <div className="p-6 hidden md:flex items-center gap-2 cursor-pointer" onClick={() => navigate('psych-dash')}>
          <Logo type="icon" className="h-8 brightness-0 invert" />
          <span className="text-xl font-bold tracking-tight">Eazzie Pro</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map(item => {
            const active = currentRoute === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => { navigate(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={18} className={active ? 'text-[#F07C5F]' : ''} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="p-4 bg-black/10">
          <div className="flex justify-between items-center px-2 mb-4 hidden md:flex">
             <span className="text-xs font-medium text-white/50">Theme</span>
             <ThemeToggle className="!text-white hover:!bg-white/10" />
          </div>
          <div className="text-left mb-4 px-2">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-[#FFB870] capitalize">{user.role}</p>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white rounded-xl transition-colors">
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

const PsychiatristDashboard = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="space-y-8 animate-in fade-in">
       <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Patient Overview</h1>
          <p className="text-[#777777] dark:text-[#A0A0A0]">Review patient-reported trends between sessions.</p>
        </div>
        <Button icon={Key} variant="outline" onClick={() => navigate('psych-codes')}>Generate Invite Code</Button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Patients', val: '0' },
          { label: 'Check-ins this week', val: '0' },
          { label: 'Marked for session', val: '0' },
          { label: 'Pending Notes', val: '0' },
        ].map((stat, i) => (
          <Card key={i}>
            <p className="text-sm text-[#777777] dark:text-[#A0A0A0] mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">{stat.val}</p>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#EAE6E1] dark:border-[#333333] flex justify-between items-center bg-[#FFFDFA]/50 dark:bg-[#121212]/50">
          <h3 className="font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Recent Patient Activity</h3>
        </div>
        <div className="p-12 text-center text-[#777777] dark:text-[#A0A0A0]">
           <Users size={48} className="mx-auto mb-4 opacity-30" />
           <p>No patients have connected yet.</p>
           <p className="text-sm mt-2">Generate an invite code and share it with your patients to begin.</p>
           <Button className="mt-6" onClick={() => navigate('psych-codes')}>Manage Invite Codes</Button>
        </div>
      </Card>
    </div>
  );
};

export default function App() {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('eazzie_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const savedLocal = localStorage.getItem('eazzie_user');
    const savedSession = sessionStorage.getItem('eazzie_user');
    return savedLocal ? JSON.parse(savedLocal) : (savedSession ? JSON.parse(savedSession) : null);
  }); 

  const [currentRoute, setCurrentRoute] = useState(user ? (user.role === 'patient' ? 'patient-dash' : 'psych-dash') : 'landing');
  
  // DARK MODE STATE
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eazzie_theme') || 'light';
  });

  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem('eazzie_data');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Kita tambahkan fallback || [] agar tidak crash jika data lama belum punya fitur ini
      return {
        moodLogs: parsed.moodLogs || [],
        journals: parsed.journals || [],
        inviteCodes: parsed.inviteCodes || [],
        safetyPlan: parsed.safetyPlan || initialSafetyPlan
      };
    }
    return {
      moodLogs: [],
      journals: [],
      inviteCodes: [],
      safetyPlan: initialSafetyPlan
    };
  });

  // Efek merubah CSS Dark Mode di Root HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('eazzie_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('eazzie_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('eazzie_data', JSON.stringify(state));
  }, [state]);

  const addMoodLog = (log) => setState(prev => ({ ...prev, moodLogs: [...(prev.moodLogs || []), log] }));
  const addJournal = (entry) => setState(prev => ({ ...prev, journals: [...(prev.journals || []), entry] }));
  const updateSafetyPlan = (plan) => setState(prev => ({ ...prev, safetyPlan: plan }));
  
  const generateInviteCode = () => {
    const newCode = 'EAZ-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setState(prev => ({ 
      ...prev, 
      inviteCodes: [{ code: newCode, date: new Date().toLocaleDateString() }, ...(prev.inviteCodes || [])] 
    }));
  };

  const navigate = (route) => {
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  };

  const register = (userData) => {
    const newUser = { 
      id: Date.now().toString(), 
      name: userData.name, 
      email: userData.email, 
      password: userData.password, 
      role: userData.role 
    };
    setRegisteredUsers(prev => [...prev, newUser]);
    
    // Otomatis login ketika mendaftar
    setUser(newUser);
    localStorage.setItem('eazzie_user', JSON.stringify(newUser));
    navigate(newUser.role === 'patient' ? 'patient-dash' : 'psych-dash');
  };

  const login = (email, password, role, rememberMe) => {
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      if (rememberMe) {
        localStorage.setItem('eazzie_user', JSON.stringify(foundUser));
        sessionStorage.removeItem('eazzie_user');
      } else {
        sessionStorage.setItem('eazzie_user', JSON.stringify(foundUser));
        localStorage.removeItem('eazzie_user');
      }
      navigate(foundUser.role === 'patient' ? 'patient-dash' : 'psych-dash');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eazzie_user');
    sessionStorage.removeItem('eazzie_user');
    navigate('login'); // Langsung kembali ke login page supaya bisa langsung klik SignIn berkat auto-fill
  };

  const contextValue = { 
    user, register, login, logout, navigate, currentRoute, 
    theme, toggleTheme,
    state, addMoodLog, updateSafetyPlan, addJournal, generateInviteCode 
  };

  return (
    <AppContext.Provider value={contextValue}>
      {!user ? (
        <>
          {currentRoute === 'landing' && <LandingPage />}
          {currentRoute === 'login' && <AuthPage type="login" />}
          {currentRoute === 'register' && <AuthPage type="register" />}
          {!['landing', 'login', 'register'].includes(currentRoute) && <LandingPage />}
        </>
      ) : (
        user.role === 'patient' ? (
          <PatientLayout>
            {currentRoute === 'patient-dash' && <PatientDashboard />}
            {currentRoute === 'patient-mood' && <PatientMoodTracker />}
            {currentRoute === 'patient-mood-list' && <PatientMoodList />}
            {currentRoute === 'patient-journal' && <PatientJournal />}
            {currentRoute === 'patient-dbt' && <PatientDBT />}
            {currentRoute === 'patient-safety' && <PatientSafetyPlan />}
            {currentRoute === 'patient-psychiatrist' && <PatientPsychiatrist />}
            {!currentRoute.startsWith('patient-') && <PatientDashboard />}
          </PatientLayout>
        ) : (
          <PsychiatristLayout>
            {currentRoute === 'psych-dash' && <PsychiatristDashboard />}
            {currentRoute === 'psych-codes' && (
              <div className="space-y-6 animate-in fade-in">
                 <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-[#4A4A4A] dark:text-[#EAE6E1]">Invite Codes</h1>
                      <p className="text-[#777777] dark:text-[#A0A0A0]">Share these codes with your patients to connect.</p>
                    </div>
                    <Button onClick={generateInviteCode} icon={Plus}>Generate New Code</Button>
                 </div>
                 
                 {state.inviteCodes.length === 0 ? (
                   <EmptyState 
                      icon={Key}
                      title="No active codes"
                      description="Create secure codes to invite patients to connect with your Eazzie Pro dashboard."
                      action={generateInviteCode}
                      actionText="Generate First Code"
                   />
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                     {state.inviteCodes.map((c, i) => (
                       <Card key={i} className="flex justify-between items-center">
                         <div>
                           <p className="font-mono text-lg font-bold text-[#F07C5F] tracking-widest">{c.code}</p>
                           <p className="text-xs text-[#777777] dark:text-[#A0A0A0] mt-1">Generated: {c.date}</p>
                         </div>
                         <Badge variant="success">Active</Badge>
                       </Card>
                     ))}
                   </div>
                 )}
              </div>
            )}
             {!['psych-dash', 'psych-codes'].includes(currentRoute) && <PsychiatristDashboard />}
          </PsychiatristLayout>
        )
      )}
    </AppContext.Provider>
  );
}
