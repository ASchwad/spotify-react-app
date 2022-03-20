import React from 'react';

function KeyValueItem({ description, value }: { description: string, value: string }) {
  return (
    <div className='flex flex-col items-start'>
      <p className="text-xs font-light">
        {description}
      </p>
      <p className="text-2xl font-semibold">
        {value}
      </p>
    </div>
  );

}

export default KeyValueItem;