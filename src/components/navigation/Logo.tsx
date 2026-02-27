import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

// Logo SVG for clipboard copy
const LOGO_SVG = `<svg viewBox="0 0 67 67" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.21 67V44.6369H0V67H22.21Z" fill="currentColor"/>
  <path d="M0 44.6369L22.21 46.8285V44.6369H0Z" fill="#DDDDDD"/>
  <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" fill="currentColor"/>
  <path d="M22.21 0H0V22.3184H22.21V0Z" fill="currentColor"/>
  <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" fill="currentColor"/>
  <path d="M66.6753 22.3185L44.5098 20.0822V22.3185H66.6753Z" fill="#DDDDDD"/>
  <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" fill="currentColor"/>
</svg>`;

// Context menu items for right-click
const contextMenuItems = [
  { label: "Copy Logo SVG", action: "copy-svg" },
  { label: "Brand Guidelines", href: "/brand" },
  { divider: true },
  { label: "All Products", href: "/products" },
  { label: "Hanzo Dev", href: "/dev" },
  { label: "AI & Models", href: "/ai" },
  { label: "Hanzo Cloud", href: "/cloud" },
  { divider: true },
  { label: "Documentation", href: "https://docs.hanzo.ai", external: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Sales", href: "/contact" },
  { label: "Status", href: "/status" },
];

const Logo = () => {
  const { isDarkMode } = useTheme();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContextMenu(null);
    };

    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleMenuItemClick = async (item: typeof contextMenuItems[0]) => {
    setContextMenu(null);
    if ('action' in item && item.action === 'copy-svg') {
      try {
        await navigator.clipboard.writeText(LOGO_SVG);
      } catch (err) {
        console.error('Failed to copy SVG:', err);
      }
    } else if ('external' in item && item.external) {
      window.open(item.href, "_blank");
    } else if (item.href) {
      navigate(item.href);
    }
  };

  const fillColor = isDarkMode ? "#ffffff" : "#000000";
  const accentColor = "#DDDDDD";

  return (
    <>
      <Link
        to="/"
        className="relative flex items-center"
        onContextMenu={handleContextMenu}
      >
        <div className="w-7 h-7 flex-shrink-0">
          <svg
            viewBox="0 0 67 67"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path d="M22.21 67V44.6369H0V67H22.21Z" fill={fillColor} />
            <path d="M0 44.6369L22.21 46.8285V44.6369H0Z" fill={accentColor} />
            <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" fill={fillColor} />
            <path d="M22.21 0H0V22.3184H22.21V0Z" fill={fillColor} />
            <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" fill={fillColor} />
            <path d="M66.6753 22.3185L44.5098 20.0822V22.3185H66.6753Z" fill={accentColor} />
            <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" fill={fillColor} />
          </svg>
        </div>
      </Link>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`fixed z-[200] rounded-lg shadow-2xl py-1 min-w-[180px] border ${
              isDarkMode
                ? "bg-black border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {contextMenuItems.map((item, index) =>
              'divider' in item ? (
                <div key={index} className={`border-t my-1 ${isDarkMode ? "border-neutral-800" : "border-neutral-200"}`} />
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                    isDarkMode
                      ? "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                  }`}
                >
                  {item.label}
                  {'action' in item && item.action === 'copy-svg' && (
                    <svg className={`w-3 h-3 ${isDarkMode ? "text-neutral-500" : "text-neutral-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                  {'external' in item && item.external && (
                    <svg className={`w-3 h-3 ${isDarkMode ? "text-neutral-500" : "text-neutral-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Logo;
