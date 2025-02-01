"use client"
import { useState } from "react";
type Props = {
    tabs: { name: string; value: string; icon: string; }[],
    activeTab: string,
    handleValue: (value: string) => void,
    tabPadding?: string | '4',
}
const Selection = ({
    tabs,
    handleValue,
    activeTab,
    tabPadding = '2',
}: Props) => {
    const [activeTabs, setactiveTabs] = useState(activeTab);

    const handleTabClick = (tab: { name: string; value: string; icon: string; }) => {
        handleValue(tab.value);
        setactiveTabs(tab.value);
    };
    return (
        <div className="w-fit flex flex-col rounded-lg">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`capitalize flex flex-col px-2 items-center justify-center text-sm border-y border-white text-nowrap py-${tabPadding} ${activeTabs === tab.value ? 'bg-white' : 'bg-gray-200'} transition duration-200`}
                    onClick={() => handleTabClick(tab)}
                >
                    <i className={`${tab.icon} text-2xl`}></i>
                    <span className="text-sm">{tab.name}</span>
                </button>
            ))}
        </div>
    )
}

export default Selection
