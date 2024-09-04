export const addBlockToDraftDocument = async ({
  documentId,
  client,
  fieldName,
  block,
}) => {
  try {
    let draftDocumentId: string;
    if (documentId.includes('drafts.')) draftDocumentId = documentId;
    else draftDocumentId = `drafts.${documentId}`;

    // check whether draft document exists
    const [published, draft] = await client.getDocuments([
      documentId.replace('drafts.', ''),
      draftDocumentId,
    ]);

    // if draft document doesn't exists, create draft document
    if (!draft) {
      await client.createIfNotExists({
        ...published,
        _id: draftDocumentId,
      });
    }

    await client
      .patch(draftDocumentId)
      .setIfMissing({ [fieldName]: [] })
      .append(fieldName, [block])
      .commit({
        autoGenerateArrayKeys: true,
      });
  } catch (error) {
    console.error('Something went wrong.', error);
  }
};
