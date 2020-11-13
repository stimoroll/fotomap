const uploadWidget = (config = {}, data = {}, sucessCallback = () => {}, eventCallback = () => {}) => {
    window.cloudinary.openUploadWidget({
      cloud_name: config.cloudinary.API_NAME,
      upload_preset: config.cloudinary.API_NAME,
      sources: ["local", "url", "camera", "google_drive", "facebook", "dropbox", "instagram"],
      showAdvancedOptions: true, cropping: false, multiple: false, defaultSource: "local", styles: { palette: { window: "#000000", sourceBg: "#000000", windowBorder: "#8E9FBF", tabIcon: "#FFFFFF", inactiveTabIcon: "#8E9FBF", menuIcons: "#2AD9FF", link: "#08C0FF", action: "#336BFF", inProgress: "#00BFFF", complete: "#33ff00", error: "#EA2727", textDark: "#000000", textLight: "#FFFFFF" }, fonts: { default: null, "'Space Mono', monospace": { url: "https://fonts.googleapis.com/css?family=Space+Mono", active: true } } }
    },
    (error, result) => {
      console.log("result", result);
      console.log("error", error);
      if (result) {
        if (result.event === 'close') {
          eventCallback();
        }

        if (result.event === 'success') {
          sucessCallback({ ...result.info, ...data });
        }
      }
    });
}
  
export default uploadWidget;