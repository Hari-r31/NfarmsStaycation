'use client';

import { useState, useEffect } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Search,
  Mail,
  Phone,
  Sparkles,
  MessageSquare,
  Home,
  Info,
  Image as Gallery,
  DollarSign,
  HelpCircle,
} from 'lucide-react';

export default function CommandPalette({ className = '' }) {
  const [open, setOpen] = useState(false);

  // ⌘K (Mac) or Ctrl+K (Windows)
  useEffect(() => {
    const down = (e) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Lock background scroll when dialog is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  // Command configuration
  const commands = [
    {
      group: 'Navigation',
      items: [
        {
          name: 'Home',
          action: () =>
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }),
          icon: Home,
        },
        {
          name: 'About Us',
          action: () =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
          icon: Info,
        },
        {
          name: 'Services',
          action: () =>
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }),
          icon: Sparkles,
        },
        {
          name: 'Gallery',
          action: () =>
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }),
          icon: Gallery,
        },
        {
          name: 'Pricing',
          action: () =>
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }),
          icon: DollarSign,
        },
        {
          name: 'FAQ',
          action: () =>
            document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }),
          icon: HelpCircle,
        },
        {
          name: 'Contact',
          action: () =>
            document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }),
          icon: Mail,
        },
      ],
    },
    {
      group: 'Quick Actions',
      items: [
        {
          name: 'Email Us',
          action: () =>
            window.open(
              'https://mail.google.com/mail/?view=cm&fs=1&to=hello@thebuild.in&su=I%20need%20more%20info',
              '_blank'
            ),
          icon: Mail,
        },
        {
          name: 'Call Us',
          action: () => window.open('tel:919393935050'),
          icon: Phone,
        },
        {
          name: 'Chat on WhatsApp',
          action: () => {
            const msg = encodeURIComponent("Hi, I'd like to know more!");
            window.open(`https://wa.me/919393935050?text=${msg}`, '_blank');
          },
          icon: MessageSquare,
        },
      ],
    },
  ];

  const handleCommand = (action) => {
    action();
    setOpen(false);
  };

  // Trap mousewheel scroll inside dialog list
  useEffect(() => {
    if (!open) return;
    const scrollArea = document.getElementById('command-scroll');
    if (!scrollArea) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        e.preventDefault();
      }
      e.stopPropagation();
    };

    const handleTouch = (e) => e.stopPropagation();

    scrollArea.addEventListener('wheel', handleWheel, { passive: false });
    scrollArea.addEventListener('touchmove', handleTouch, { passive: false });

    return () => {
      scrollArea.removeEventListener('wheel', handleWheel);
      scrollArea.removeEventListener('touchmove', handleTouch);
    };
  }, [open]);

  return (
    <>
      {/* 🔍 Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className={`hidden md:flex items-center justify-between w-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-gray-400/20 
          px-4 py-2.5 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-white/20 
          transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${className}`}
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-green-700 dark:text-green-400" />
          <span className="text-gray-600 dark:text-gray-300">Search...</span>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-white/30 bg-white/10 px-1.5 py-0.5 
          font-mono text-[11px] font-medium text-gray-600 dark:text-gray-400 shadow-inner">
          <span className="text-xs opacity-90">⌘</span>
          <span className="opacity-90">K</span>
        </div>
      </button>

      {/* 🧭 Command Palette Modal */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="flex flex-col max-h-[80vh] overflow-hidden rounded-2xl 
                   border border-white/20 bg-white/10 dark:bg-black/40 backdrop-blur-xl 
                   shadow-[0_0_25px_rgba(0,0,0,0.3)]"
      >
        <VisuallyHidden>
          <h2>Command Palette</h2>
        </VisuallyHidden>

        {/* Input */}
        <div className="border-b border-white/10 dark:border-white/20">
          <CommandInput
            placeholder="Type a command or search..."
            className="text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Scrollable Command List */}
        <div
  id="command-scroll"
  className="flex-1 overflow-y-auto overscroll-contain scroll-smooth p-3 
             max-h-[60vh] scrollbar-thin scrollbar-thumb-green-600/40 scrollbar-track-transparent"
  onWheel={(e) => e.stopPropagation()} // prevent event bubbling to background
  onTouchMove={(e) => e.stopPropagation()}
>

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {commands.map((group) => (
              <CommandGroup
                key={group.group}
                heading={group.group}
                className="text-gray-400 dark:text-gray-500 uppercase text-[11px] tracking-wider font-semibold"
              >
                {group.items.map((item) => (
                  <CommandItem
                    key={item.name}
                    onSelect={() => handleCommand(item.action)}
                    className="flex items-center gap-3 cursor-pointer hover:bg-green-600/20 text-gray-900 dark:text-gray-100 
                      rounded-lg px-3 py-2 transition-colors duration-150"
                  >
                    <item.icon className="h-4 w-4 text-green-700 dark:text-green-400" />
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
