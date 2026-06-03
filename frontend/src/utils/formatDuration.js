export const formatDuration = (duration) => {
  const hrs = Math.floor(duration / 3600);

  const mins = Math.floor((duration % 3600) / 60);

  const secs = Math.floor(duration % 60);

  let result = "";

  if (hrs > 0) {
    result += `${hrs} hr `;
  }

  if (mins > 0) {
    result += `${mins} min `;
  }

  if (secs > 0 || result === "") {
    result += `${secs} sec`;
  }

  return result.trim();
};
