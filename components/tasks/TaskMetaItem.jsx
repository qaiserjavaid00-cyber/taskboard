export default function TaskMetaItem({
    icon: Icon,
    title,
    subtitle,
    iconClassName,
}) {
    return (
        <div className="flex items-center gap-3 bg-[#111827] border border-white/5 rounded-xl px-4 py-3">
            <Icon className={iconClassName} />

            <div>
                <p className="font-medium">
                    {title}
                </p>

                <p className="text-xs text-slate-400">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}