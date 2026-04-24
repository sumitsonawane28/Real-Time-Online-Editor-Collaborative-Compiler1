/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './layout/Navbar';
import { ActivityBar, ActivityTab } from './layout/ActivityBar';
import { Sidebar } from './layout/Sidebar';
import { EditorPanel } from './components/EditorPanel';
import { TerminalPanel } from './components/TerminalPanel';
import { ChatPanel } from './components/ChatPanel';
import { FileNode } from './types';
import { AnimatePresence } from 'motion/react';

const INITIAL_FILES: FileNode[] = [
  {
    id: '1',
    name: 'App.tsx',
    language: 'typescript',
    content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-10">\n      <h1 className="text-4xl font-bold">Welcome to NexusCode</h1>\n      <p className="mt-4 text-gray-400">Join a session to start collaborating.</p>\n    </div>\n  );\n}`,
    isOpen: true
  },
  {
    id: '2',
    name: 'styles.css',
    language: 'css',
    content: `.editor-container {\n  background: #1e1e1e;\n  color: white;\n  font-family: 'Inter', sans-serif;\n}`,
    isOpen: true
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActivityTab>('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [files, setFiles] = useState<FileNode[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState(INITIAL_FILES[0].id);

  const handleTabChange = (tab: ActivityTab) => {
    if (activeTab === tab) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setActiveTab(tab);
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-vscode-bg text-vscode-text overflow-hidden font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Activity Bar + Sidebar */}
        <div className="flex h-full">
          <ActivityBar activeTab={activeTab} setActiveTab={handleTabChange} />
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <Sidebar key="sidebar" activeTab={activeTab} isOpen={true} />
            )}
          </AnimatePresence>
        </div>

        {/* Center: Editor + Terminal */}
        <div className="flex-1 flex flex-col min-w-0">
          <EditorPanel 
            files={files} 
            activeFileId={activeFileId} 
            setActiveFileId={setActiveFileId} 
          />
          <TerminalPanel 
            isOpen={isTerminalOpen} 
            setIsOpen={setIsTerminalOpen} 
          />
        </div>

        {/* Right Panel: Chat */}
        <ChatPanel 
          isOpen={isChatOpen} 
          setIsOpen={setIsChatOpen} 
        />
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-vscode-status text-white flex items-center justify-between px-3 text-[11px] font-medium shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-pointer">
            <span>main*</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1">
               <span>0 Errors, 0 Warnings</span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="opacity-80">UTF-8</span>
          </div>
          <div className="flex items-center gap-1">
            <span>TypeScript JSX</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Spaces: 2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span>Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

