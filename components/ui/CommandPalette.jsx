import { useState, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  ExternalLink,
  Mail,
  Phone,
  Code2,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function CommandPalette({ className = "" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands = [
    {
      group: "Navigation",
      items: [
        {
          name: "Home",
          action: () =>
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }),
          icon: Code2,
        },
        {
          name: "Services",
          action: () =>
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }),
          icon: Sparkles,
        },
        {
          name: "Portfolio",
          action: () =>
            document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }),
          icon: ExternalLink,
        },
        {
          name: "Contact",
          action: () =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
          icon: Mail,
        },
      ],
    },
    {
      group: "Actions",
      items: [
        {
          name: "Email Us",
          action: () =>
            window.open(
              "https://mail.google.com/mail/?view=cm&fs=1&to=hello@thebuild.in&su=I%20need%20more%20info",
              "_blank"
            ),
          icon: Mail,
        },
        {
          name: "Call Us",
          action: () => window.open("tel:+919491147433"),
          icon: Phone,
        },
        {
          name: "Chat with Us on WhatsApp",
          action: () => {
            const message = "Hi, I'd like to chat!";
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/+919491147433?text=${encodedMessage}`);
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

  return (
    <>
      {/* ✨ Trigger button (search input look-alike) */}
<button
  onClick={() => setOpen(true)}
  className={`hidden md:flex items-center justify-between w-full bg-white/10 backdrop-blur-lg border border-black/20 
              px-4 py-2 rounded-full text-sm text-gray hover:bg-white/15 hover:border-white/30 
              transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.05)] ${className}`}
>

        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-600" />
          <span className="text-gray-600">Search...</span>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-white/30 bg-white/10 px-1.5 py-0.5 
                        font-mono text-[11px] font-medium text-gray-600 shadow-inner">
          <span className="text-xs opacity-90">⌘</span>
          <span className="opacity-90">K</span>
        </div>
      </button>

      {/* 🧭 Command palette modal */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="border border-white/20 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <VisuallyHidden>
          <h2>Command Palette</h2>
        </VisuallyHidden>

        <div className="border-b border-white/10">
          <CommandInput placeholder="Type a command or search..." />
        </div>

        <CommandList className="p-2">
          <CommandEmpty>No results found.</CommandEmpty>

          {commands.map((group) => (
            <CommandGroup
              key={group.group}
              heading={group.group}
              className="text-gray-300"
            >
              {group.items.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => handleCommand(item.action)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-2 py-1.5"
                >
                  <item.icon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-100">{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
