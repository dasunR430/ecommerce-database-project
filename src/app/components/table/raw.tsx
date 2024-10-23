export default function Raw({  raw }: {  raw: string[] }) {
  return (
    <tr className="border-t border-gray-200 bg-white hover:bg-gray-50">
      {raw.map((item, index) => (
        <td key={index} className="py-3 px-4 text-gray-700">
          {item}
        </td>
      ))}
    </tr>
  );
}
