'use client'

import React, { useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MousePointer2,
    Square,
    Frame,
    PenTool,
    Type,
    MessageCircle,
    Users,
    Code,
    Ruler,
    SquarePen,
    ChevronDown,
} from 'lucide-react'

function ToolbarButton({
    icon: Icon,
    active,
    activeColor = 'blue',
}: {
    icon: LucideIcon
    active?: boolean
    activeColor?: 'blue' | 'green'
}) {
    const activeClasses =
        activeColor === 'blue'
            ? 'bg-blue-500 text-white'
            : 'bg-green-500 text-white'

    return (
        <button
            className={`flex items-center justify-center p-2 rounded-md transition-colors ${active ? activeClasses : 'hover:bg-gray-100'
                }`}
        >
            <Icon size={20} />
        </button>
    )
}

function DropdownArrow({ active }: { active?: boolean }) {
    return (
        <button
            className={`flex items-center justify-center px-1 rounded-md transition-colors ${active ? 'hover:bg-blue-100' : 'hover:bg-gray-100'
                }`}
        >
            <ChevronDown
                size={14}
                className={`${active ? 'text-black opacity-80' : 'text-black opacity-70'
                    }`}
            />
        </button>
    )
}

// function Popover({ message }: { message: string }) {
//     return (
//         <AnimatePresence mode="popLayout">
//             <motion.div
//                 key={'popover'}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.3 }}
//                 className="absolute flex items-center justify-center -top-14 left-1/2 -translate-x-1/2 
//             bg-white border font-medium text-sm px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
//                 {message}
//             </motion.div>
//         </AnimatePresence>
//     )
// }

export default function ToolBar() {
    const [isDevMode, setIsDevMode] = useState(false)
    const [showPopover, setShowPopover] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)


    const toggleMode = () => {
        const nextMode = !isDevMode
        setIsDevMode(nextMode)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setShowPopover(true)

        timeoutRef.current = setTimeout(() => {
            setShowPopover(false)
        }, 1500)
    }

    return (
        <div className="flex justify-center items-center h-[100dvh] w-full">
            <div className='relative'>
                <AnimatePresence mode="wait">
                    {showPopover && (
                        <motion.div
                            key={`popover-${isDevMode}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute flex items-center justify-center -top-14 left-1/2 -translate-x-1/2 
                 bg-white border font-medium text-sm px-4 py-2 rounded-lg shadow-md whitespace-nowrap"
                        >
                            {isDevMode ? 'Switched to Dev Mode' : 'Switched to Design Mode'}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    layout
                    transition={{ duration: 0.45 }}
                    className="relative flex items-center border shadow-lg rounded-xl bg-white overflow-hidden">
                    <AnimatePresence mode='popLayout' initial={false}   >
                        {isDevMode ? (
                            <motion.div
                                layout
                                key={'dev-tools'}
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                exit={{ y: 100 }}
                                transition={{ duration: 0.45, type: 'spring', bounce: 0 }}
                                className=' flex items-center h-12 px-2  gap-2 '
                            >
                                <ToolbarButton icon={MousePointer2} active activeColor="green" />
                                <ToolbarButton icon={Ruler} />
                                <ToolbarButton icon={SquarePen} />
                                <ToolbarButton icon={MessageCircle} />
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                key={'design-tools'}
                                initial={{ y: -100 }}
                                animate={{ y: 0 }}
                                exit={{ y: -100 }}
                                transition={{ duration: 0.45, type: 'spring', bounce: 0 }}
                                className=' flex items-center h-12 px-2  gap-2 '
                            >
                                <ToolbarButton icon={MousePointer2} active />
                                <DropdownArrow active />

                                <ToolbarButton icon={Frame} />
                                <DropdownArrow />

                                <ToolbarButton icon={Square} />
                                <DropdownArrow />

                                <ToolbarButton icon={PenTool} />
                                <DropdownArrow />

                                <ToolbarButton icon={Type} />
                                <ToolbarButton icon={MessageCircle} />
                                <ToolbarButton icon={Users} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div layoutId='toggle-btn' transition={{ bounce: 0, duration: 0.45 }} className='flex justify-center items-center border-l-2 bg-white h-12 px-2'>
                        <button
                            onClick={toggleMode}
                            className={`flex rounded-md transition-colors p-1 w-12 ${isDevMode ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                            <div
                                className={`flex p-1 rounded-sm bg-white shadow transition-transform duration-300 ${isDevMode ? 'translate-x-3.5' : 'translate-x-0'} `}
                            >
                                <Code size={18} className={isDevMode ? 'text-green-600' : 'text-gray-700'} />
                            </div>
                        </button>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    )
}
