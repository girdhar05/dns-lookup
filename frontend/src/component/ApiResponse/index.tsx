import { memo } from "react";
import renderObject from "../RenderObject";

export const ApiResponseView = memo(({data}: {data: any}) => (
  <div className="mt-8 max-h-[38rem] overflow-y-auto w-full max-w-3xl mx-auto custom-scrollbar">
    <div className="bg-white p-4 border border-gray-400 rounded shadow">
      {renderObject(data)}
    </div>
  </div>
))