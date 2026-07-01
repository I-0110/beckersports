import { StatCardsProps } from "@/app/lib/post/interfaces";

export default function StatCards({ total, published, drafts }: StatCardsProps) {
    const stats = [
        {
            label: "Total Posts", 
            value: total,
            accent: false
        },
        {
            label: "Published",
            value: published,
            accent: true
        },
        {
            label: "Drafts",
            value: drafts,
            accent: false
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
                <div key={stat.label} className="font-nav bg-chiefs-3 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">{stat.label}</h3>
                    <p className={`text-3xl font-bold ${stat.accent ? 'text-chiefs-a' : ''}`}>{stat.value}</p>
                </div>
            ))}
        </div>
    );
}