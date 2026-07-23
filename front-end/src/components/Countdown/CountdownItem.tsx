type Props = {
  value: number;
  label: string;
};

export default function CountdownItem({
  value,
  label,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="
          block
          items-center
          text-center
          justify-center
          w-24
          h-24
          rounded-xl
          text-white
        "
      >
        <span className="text-4xl font-bold tabular-nums">
          {String(value).padStart(2, "0")}
        </span><br/>
        <span className="mt-3 text-sm uppercase tracking-widest text-blue-500 block">
          {label}
        </span>
      </div>

      
    </div>
  );
}
