// components/project/StatsCard.jsx

"use client";

const StatsCard = ({
    title,
    value,
    icon: Icon,
    iconBg,
    iconColor,
}) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>
                </div>

                <div className={`p-3 rounded-xl ${iconBg}`}>
                    <Icon className={iconColor} />
                </div>
            </div>
        </div>
    );
};

export default StatsCard;