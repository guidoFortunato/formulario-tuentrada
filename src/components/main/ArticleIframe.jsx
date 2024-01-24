"use client";

export const ArticleIframe = ({ itemColumn }) => {
  // console.log({ itemColumn });
  
  const title = itemColumn?.titleOrLabel;
  const iframe = itemColumn?.iframe;

  return (
    <div className="w-full ">
         <h3 className="text-blue-dark font-semibold mb-2">{title}</h3>
      <div className="relative w-full overflow-hidden flex justify-center items-center">
        <div className="aspect-w-16 aspect-h-9 ">
          <div className="w-full h-full mb-5"  dangerouslySetInnerHTML={{ __html: iframe }} />
        </div>
      </div>
    </div>
  );
};