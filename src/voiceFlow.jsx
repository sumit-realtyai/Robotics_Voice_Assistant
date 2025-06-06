import React, { useEffect } from 'react';

const VoiceflowWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '679562fe70f1b9c43e436f24' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="mb-20 md:mb-0">
      {/* No need to render anything for this widget */}
    </div>
  );
};

export default VoiceflowWidget;