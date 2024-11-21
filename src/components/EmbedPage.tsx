import React from 'react';

const EmbedPage: React.FC<{ url: string; width?: string; height?: string }> = ({ 
  url, 
  width = "100%", 
  height = "500px" 
}) => {
  return (
    <iframe 
      src={url} 
      width={width} 
      height={height} 
      frameBorder="0" 
      allowFullScreen
    ></iframe>
  );
};

export default EmbedPage;