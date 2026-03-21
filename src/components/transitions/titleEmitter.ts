export const titleEmitter = new EventTarget();

export const dispatchTitleChange = (newTitle: string) => {
  titleEmitter.dispatchEvent(new CustomEvent("titleChange", { detail: newTitle }));
};
