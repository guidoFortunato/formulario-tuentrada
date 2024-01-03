

const SocialMedia = ({ data }) => {
  return (
    <div className=" flex justify-center space-x-4 mt-2">
      {data.socialNetworks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          title={`Seguinos en ${item.type}`}
        >
          <svg xmlns={item.xmlns} fill={item.fill} viewBox={item.viewBox} width={item.width} height={item.height} >
          <g transform="scale(8.53333,8.53333)"><path d={item.path} /></g> 
          </svg>
          
        </a>
      ))} 
    </div>
  );
};

export default SocialMedia;
