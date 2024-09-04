const datasetConfig = { projectId: '', dataset: '' };

export const setExternalDatasetConfig = data => {
  if (!data.projectId || !data.dataset) {
    throw new Error(`Dataset config is not provided`);
  }
  datasetConfig.projectId = data.projectId;
  datasetConfig.dataset = data.dataset;
};

export function getExternalDatasetConfig() {
  return datasetConfig;
}
