"use client";

export const ArticleIframe = ({ itemColumn }) => {
  console.log({ itemColumn });
  
  const title = itemColumn?.titleOrLabel;
  const iframe = itemColumn?.iframe;

  return (
    <div className="w-full ">
         <h3 className="text-blue-dark font-semibold mb-2">{title}</h3>
      <div className=" overflow-hidden flex justify-center items-center">
        
          <div className="w-full h-full mb-5"  dangerouslySetInnerHTML={{ __html: iframe }} />
       
      </div>
    </div>
  );
};