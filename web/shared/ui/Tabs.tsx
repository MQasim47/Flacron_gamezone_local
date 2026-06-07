import { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const tabCount = tabs.length;
    let newIndex: number | null = null;
    switch (e.key) {
      case "ArrowRight":
        newIndex = (currentIndex + 1) % tabCount;
        break;
      case "ArrowLeft":
        newIndex = (currentIndex - 1 + tabCount) % tabCount;
        break;
      case "Home":
        newIndex = 0;
        break;
      case "End":
        newIndex = tabCount - 1;
        break;
    }
    if (newIndex !== null) {
      e.preventDefault();
      onTabChange(tabs[newIndex].id);
      document.getElementById(`tab-${tabs[newIndex].id}`)?.focus();
    }
  };

  return (
    <div
      className="flex gap-1 sm:gap-2 border-b border-slate-700/50 overflow-x-auto scrollbar-none"
      role="tablist"
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 font-medium transition-colors relative text-xs sm:text-sm ${
              isActive
                ? "text-blue-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1 sm:ml-2 text-xs opacity-60">
                ({tab.count})
              </span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
