const currentCMS = {
  name: '',
};

export const getCurrentCMS = () => currentCMS;
export const setCurrentCMS = (name: string) => {
  currentCMS.name = name;
};
