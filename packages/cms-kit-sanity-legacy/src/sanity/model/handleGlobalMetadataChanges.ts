import type { GlobalMetadataHandlerProps } from './types';

export const handleGlobalMetadataConfirm = (
  props: GlobalMetadataHandlerProps,
) => {
  const { sanityImage, toast } = props;

  sanityImage._id
    ? patchImageData(props)
    : toast.push({
        status: 'error',
        title: `No image found!`,
        description: `Metadata was not added to the asset because there is no _id... `,
      });
};

const patchImageData = ({
  docId,
  sanityImage,
  toast,
  client,
  onClose,
  changed,
  imagePath,
}: GlobalMetadataHandlerProps) => {
  const valuesToSet = Object.entries(sanityImage).reduce(
    (acc, [key, value]) => {
      if (value === '') {
        return acc;
      }

      return {
        ...acc,
        [key]: value,
      };
    },
    {},
  );

  const valuesToUnset = Object.entries(sanityImage).reduce(
    (acc, [key, value]) => {
      if (value === '') {
        return [...acc, key];
      }

      return acc;
    },
    [],
  );

  client
    .patch(sanityImage._id as string)
    .set(valuesToSet)
    .unset(valuesToUnset)
    .commit(/* {dryRun: true} */) //If you want to test this script first, you can use the dryRun option to see what would happen without actually committing the changes to the content lake.
    .then(res =>
      toast.push({
        status: 'success',
        title: `Success!`,
        description: `Metadata added to asset with the _id ${res._id}`,
      }),
    )
    .then(() => {
      client
        .patch(docId)
        .set({ [`${imagePath}.changed`]: !changed })
        .commit();
    })
    .finally(() => onClose())
    .catch(err => console.error(err));
};
