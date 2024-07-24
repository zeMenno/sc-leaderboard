export type ScoreItem = {
    colorClass: string;
    points: number;
}

export default function ScoreItemComponent(index: number, props: ScoreItem) {
    return (
        <div
            className={`flex shadow-lg p-4 rounded-xl mb-2 text-xl text-center font-bold ${props.colorClass}`}
        >
            <div>{index + 1}.</div>
            <div className="flex-grow">{props.points}</div>
        </div>

    )
}