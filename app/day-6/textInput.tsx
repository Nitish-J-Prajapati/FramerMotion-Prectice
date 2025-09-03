'use client'
import { useState } from 'react'
import {
    X,
    Plus,
    Zap,
    ImageIcon,
    PlayCircle,
    Mic,
    ArrowUp,
    Globe,
} from 'lucide-react'
import './textInput.css'

export default function TextInput() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>('video')
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const funny = 'This is a static placeholder. No action was taken.'

    return (
        <div className="flex justify-center items-center h-[100dvh] w-full bg-gray-200">
            <div
                onClick={() => !isOpen && setIsOpen((prev) => !prev)}
                style={
                    {
                        '--width': isOpen ? '538px' : '50px',
                        '--height': isOpen ? '402px' : '50px',
                        '--rounded': isOpen ? '20px' : '50px',
                    } as React.CSSProperties
                }
                className="chat geist-regular"
                data-opened={isOpen}
                data-processing={isProcessing}
            >
                <Globe size={20} className="chat-img" data-opened={isOpen} />

                <div className="flex justify-between items-center">
                    <div
                        onClick={() => {
                            if (isOpen) {
                                setIsOpen((prev) => !prev)
                                setIsProcessing(false)
                            }
                        }}
                        className="close"
                        data-opened={isOpen}
                    >
                        <X size={18} />
                    </div>

                    <div className="geist-semibold drafts" data-opened={isOpen}>
                        Drafts
                    </div>
                </div>

                <textarea
                    placeholder="A dog surfing in space? ..."
                    data-opened={isOpen}
                    data-processing={isProcessing}
                />

                <div className="processed" data-processing={isProcessing}>
                    {funny.split(' ').map((text, index) => (
                        <div
                            style={{ '--index': index } as React.CSSProperties}
                            className="processed-text"
                            data-processing={isProcessing}
                            key={index}
                        >
                            {text}
                        </div>
                    ))}
                </div>

                <div
                    className="panel"
                    data-opened={isOpen}
                    data-processing={isProcessing}
                >
                    <div className="subpanel">
                        <div className="panel-item" data-opened={isOpen}>
                            <Plus
                                size={20}
                            />
                        </div>

                        <div className="panel-item" data-opened={isOpen}>
                            <Zap size={20} />
                        </div>

                        <div className="panel-long-item" data-opened={isOpen}>
                            <div
                                style={
                                    {
                                        '--transform':
                                            activeTab === 'image'
                                                ? '-6px'
                                                : activeTab === 'video' && '90px',
                                    } as React.CSSProperties
                                }
                                className="panel-long-item-bg"
                            ></div>
                            <div
                                onClick={() => setActiveTab('image')}
                                className={`gap-[7px] h-full ${activeTab === 'image' ? 'opacity-100' : 'opacity-50'
                                    } transition-opacity-ease duration-600 flex items-center select-none cursor-pointer z-0`}
                            >
                                <ImageIcon size={25} />
                                Image
                            </div>

                            <div
                                onClick={() => setActiveTab('video')}
                                className={`gap-[7px] h-full ${activeTab === 'video' ? 'opacity-100' : 'opacity-50'
                                    } transition-opacity-ease duration-600 flex items-center select-none cursor-pointer z-0`}
                            >
                                <PlayCircle size={28} />
                                Video
                            </div>
                        </div>
                    </div>

                    <div className="subpanel" data-send="true">
                        <Mic size={24} />

                        <div
                            onClick={() => setIsProcessing(true)}
                            className="panel-item-black"
                            data-opened={isOpen}
                        >
                            <ArrowUp size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
