import React from "react";

const SynthflowWidget = () => {
  return (
    <div className="mb-20 md:mb-0">
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe id="audio_iframe" 
                       src="https://fine-tuner.ai/widget/1737803609652x417436987590211800" 
                       allow="microphone" 
                       width="400px" 
                       height="550px" 
                       pointer-events="none" 
                       scrolling="no" 
                       style="position: fixed; background: transparent; border: none; z-index: 999">
                   </iframe>`
        }}
      />
    </div>
  );
};

export default SynthflowWidget;