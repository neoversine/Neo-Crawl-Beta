import React from "react";
import { FaRunning, FaChartLine, FaDatabase, FaCogs } from "react-icons/fa";

const PieSection = () => {
    const steps = [
        {
            icon: <FaRunning size={28} className="text-white" />,
            title: "Performance",
            text: "Boost efficiency and streamline your process with ease.",
        },
        {
            icon: <FaChartLine size={28} className="text-white" />,
            title: "Analytics",
            text: "Turn data into insights with clear and powerful analytics.",
        },
        {
            icon: <FaDatabase size={28} className="text-white" />,
            title: "Data",
            text: "Easily manage, organize, and access your structured data.",
        },
        {
            icon: <FaCogs size={28} className="text-white" />,
            title: "Automation",
            text: "Automate workflows to save time and reduce manual effort.",
        },
    ];

    return (
        <div className="relative flex items-center justify-center w-full h-full ">
            {/* Outer arc */}
            <div className="w-[750px] h-[750px] rounded-full border-[200px] border-r-transparent -rotate-45 border-black"></div>

            {/* Steps placed along arc */}
            <div className="absolute right-1/4 w-[600px] h-[600px] flex flex-col justify-between text-black">
                {/* Top */}
                <div className="flex flex-col items-center text-center w-1/2 mx-auto">
                    {steps[0].icon}
                    <h2 className="mt-2 font-bold text-lg text-white">{steps[0].title}</h2>
                    <p className="text-sm text-gray-300">{steps[0].text}</p>
                </div>

                {/* Middle Left */}
                <div className="flex flex-col text-left w-1/2 ml-10">
                    {steps[1].icon}
                    <h2 className="mt-2 font-bold text-lg text-white">{steps[1].title}</h2>
                    <p className="text-sm text-gray-300">{steps[1].text}</p>
                </div>

                {/* Middle Right */}
                <div className="flex flex-col text-left w-1/2 ml-10">
                    {steps[2].icon}
                    <h2 className="mt-2 font-bold text-lg text-white">{steps[2].title}</h2>
                    <p className="text-sm text-gray-300">{steps[2].text}</p>
                </div>

                {/* Bottom */}
                <div className="flex flex-col items-center text-center w-1/2 mx-auto">
                    {steps[3].icon}
                    <h2 className="mt-2 font-bold text-lg text-white">{steps[3].title}</h2>
                    <p className="text-sm text-gray-300">{steps[3].text}</p>
                </div>
            </div>
        </div>
    );
};

const Potential = () => {
    return (
        <div className="w-full">
            <div className="flex w-full max-w-7xl mx-auto">
                <div className="w-1/3"></div>
                <div className="w-2/3 h-[800px] overflow-hidden">
                    <PieSection />
                </div>

            </div>
        </div>
    )
}

export default Potential;
