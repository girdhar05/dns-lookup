import { toTitleCase } from "../../utils/helper";

export default function renderObject (obj: any, indent: number = 0) {
  const backgroundColor = indent % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
  return Object.entries(obj).map(([key, value]) => (
    key === 'loc' ? (
      <div
        key={key}
        style={{ marginLeft: indent * 20 }}
        className={`mx-4 md:mx-12 mb-2 p-2 ${backgroundColor} flex flex-wrap`}
      >
        {/* Key Container */}
        <div className="w-full sm:w-1/3">
          <strong className="mr-2">{toTitleCase(key)}:</strong>
        </div>
        {/* Value Container */}
        <div className="w-full sm:w-2/3 border-l-0 sm:border-l-2 border-gray-300 pl-0 sm:pl-2 break-words">
          <span className="ml-2">{String(value)}</span>
          <a
            href={`https://www.google.com/maps?q=${value}`}
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-blue-600 underline"
          >
            View on Map
          </a>
        </div>
      </div>
    ) : (
    <div
      key={key}
      style={{ marginLeft: indent * 20 }}
      className={`mx-4 md:mx-12 mb-2 p-2 ${backgroundColor} flex flex-wrap`}
    >
      {/* Key Container */}
      <div className="w-full sm:w-1/3">
        <strong className="mr-2">{toTitleCase(key)}:</strong>
      </div>
      {/* Value Container */}
      <div className="w-full sm:w-2/3 border-l-0 sm:border-l-2 border-gray-300 pl-0 sm:pl-2 break-words">
        {typeof value === 'object' && value !== null ? (
          Array.isArray(value) ? (
            // Render array elements
            <div>
              {value.map((item, index) => (
                <div key={index} className="ml-2">
                  {typeof item === 'object' && item !== null
                    ? renderObject(item, indent + 1)
                    : String(item)}
                </div>
              ))}
            </div>
          ) : (
            // Recursively render nested object
            renderObject(value, indent + 1)
          )
        ) : (
          <span className="ml-2">{String(value)}</span>
        )}
      </div>
    </div>
  )));
};