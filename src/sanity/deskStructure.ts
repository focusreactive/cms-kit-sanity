import { DefaultDocumentNodeContext, StructureBuilder, StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) => {
  console.log("🚀 ~ S.defaults().getItems():", S.defaults().getItems())
  // return S.defaults();
};

