'use client';
import {
  Button,
  Card,
  Dialog,
  Label,
  Stack,
  TextInput,
  useToast,
  Flex,
  Text,
  Box,
} from '@sanity/ui';
import type { ComponentType } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { Subscription } from 'rxjs';
import type {
  ImageValue,
  ObjectInputProps,
  ObjectSchemaType,
  PreviewProps,
} from 'sanity';
import { pathToString, useClient, useFormValue } from 'sanity';
import React from 'react';

import type { MetadataImage } from './types';
import { handleGlobalMetadataConfirm } from './handleGlobalMetadataChanges';

// import { sleep } from './utils/sleep';

const Metadata = ({ title, value }: any) => {
  return (
    <Flex gap={1}>
      <Text weight="bold" muted size={1}>
        {title}:
      </Text>
      <Text size={1} muted>
        {value
          ? `${value?.substring(0, 80)}${value?.length < 80 ? '' : '...'}`
          : 'Undefined'}
      </Text>
    </Flex>
  );
};
export const ImageInput: ComponentType<
  ObjectInputProps<ImageValue, ObjectSchemaType>
> = (props: ObjectInputProps<ImageValue>) => {
  // const fields = props.schemaType?.options?.requiredFields ?? [];
  const fields = [
    {
      name: 'title',
      title: 'Title',
      required: props.schemaType?.options?.requiredFields.some(
        field => field === 'title',
      ),
    },
    {
      name: 'altText',
      title: 'Alt Text',
      required: props.schemaType?.options?.requiredFields.some(
        field => field === 'altText',
      ),
    },
    {
      name: 'description',
      title: 'Description',
      required: props.schemaType?.options?.requiredFields.some(
        field => field === 'description',
      ),
    },
  ];

  const toast = useToast();

  const docId = useFormValue(['_id']) as string;

  const changed =
    (useFormValue([pathToString(props.path), 'changed']) as boolean) ?? false;

  const imageId = props.value?.asset?._ref;

  const client = useClient({ apiVersion: '2023-03-25' });

  const [sanityImage, setSanityImage] = useState<MetadataImage>(null);

  /** get object for error state from required values in `fields` array
   * @see {@link fields}
   */
  const fieldsToValidate = fields.reduce((acc, field) => {
    if (field.required) {
      return { ...acc, [field.name]: false };
    }

    return acc;
  }, {});

  /** Error state used for disabling buttons in case of missing data */
  const [validationStatus, setValidationStatus] = useState(fieldsToValidate);

  /** Dialog (dialog-image-defaults) */
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const [collapsed, setCollapsed] = useState(true);
  const onCollapse = useCallback(() => setCollapsed(true), []);
  const onExpand = useCallback(() => setCollapsed(false), []);

  /** Handle Change from Inputs in the metadata modal
   *
   * @param {string} event is the value of the input
   * @param {string} field is the input name the change is made in (corresponds with the field name on the sanity.imageAsset type)
   */
  const handleChange = useCallback(
    (event: string, field: string) => {
      event === ''
        ? setSanityImage(prevSanityImage => ({
            ...prevSanityImage,
            [field]: '',
          }))
        : setSanityImage(prevSanityImage => ({
            ...prevSanityImage,
            [field]: event,
          }));

      const isFieldToValidate = fieldsToValidate[field] !== undefined;
      isFieldToValidate &&
        setValidationStatus(prevValidationStatus => ({
          ...prevValidationStatus,
          [field]: event.trim() !== '' ? true : false,
        }));
    },
    [fieldsToValidate],
  );

  useEffect(() => {
    let subscription: Subscription;

    const query = `*[_type == "sanity.imageAsset" && _id == $imageId ][0]{
      _id,
      altText,
      title, 
      description,
    }`;
    const params = { imageId: imageId };

    const fetchReference = async (listening = false) => {
      await client
        .fetch(query, params)
        .then(res => {
          setSanityImage(res);

          const resValidationStatus = Object.entries(res).reduce(
            (acc, [key, value]) => {
              if (value && fieldsToValidate[key] !== undefined) {
                return { ...acc, [key]: true };
              }
              if (!value && fieldsToValidate[key] !== undefined) {
                return { ...acc, [key]: false };
              }

              return acc;
            },
            {},
          );
          setValidationStatus(resValidationStatus);
        })
        .catch(err => {
          console.error(err.message);
        });
    };

    const listen = () => {
      subscription = client
        .listen(query, params, { visibility: 'query' })
        .subscribe(() => fetchReference(true));
    };

    imageId ? fetchReference().then(listen) : setSanityImage(null as any);

    return function cleanup() {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [imageId, client]);

  /** Input fields based on the `fields` array
   *
   * @see {@link fields}
   */
  const inputs = fields.map(field => {
    return (
      <Card paddingBottom={4} key={field.name}>
        <label>
          <Stack space={3}>
            <Label muted size={1}>
              {field.title}
            </Label>
            <TextInput
              id="imageTitle"
              fontSize={2}
              onChange={event =>
                handleChange(event.currentTarget.value, field.name)
              }
              placeholder={field.title}
              value={sanityImage ? (sanityImage[field.name] as string) : ''}
              required={field.required}
            />
          </Stack>
        </label>
      </Card>
    );
  });

  return (
    <div>
      {props.renderDefault(props)}

      <Stack paddingY={3}>
        {sanityImage && (
          <Stack space={3} paddingBottom={2}>
            <Metadata title="Title" value={sanityImage?.title} />
            <Metadata title="Alt Text" value={sanityImage?.altText} />
            <Metadata title="Description" value={sanityImage?.description} />
          </Stack>
        )}

        <Flex paddingY={3}>
          <Button
            mode="ghost"
            onClick={onOpen}
            disabled={imageId ? false : true}
            text="Edit metadata"
          />
        </Flex>
      </Stack>

      {open && (
        <Dialog
          header="Edit image metadata"
          id="dialog-image-defaults"
          onClose={onClose}
          zOffset={1000}
          width={2}
        >
          <Card padding={5}>
            <Stack space={3}>
              {inputs}

              <Button
                mode="ghost"
                onClick={() =>
                  handleGlobalMetadataConfirm({
                    sanityImage,
                    toast,
                    client,
                    onClose,
                    docId,
                    changed,
                    imagePath: pathToString(props.path),
                  })
                }
                text="Save global changes"
                disabled={
                  !Object.values(validationStatus).every(isValid => isValid)
                }
              />
            </Stack>
          </Card>
        </Dialog>
      )}
    </div>
  );
};

type CastPreviewProps = PreviewProps & {
  components: any[];
  blockOptions: any;
  type: string;
};

export function BlockPreview(props: PreviewProps) {
  const castProps = props as CastPreviewProps;
  const { components, blockOptions, title } = castProps;

  const subtitle = `Has ${components?.length || 0} nested components`;

  return (
    <Flex align="center">
      <Box flex={1}>
        {props.renderDefault({
          ...props,
          title,
          subtitle,
          // media: (
          //   <div
          //     className="iframe-container"
          //     style={{
          //       width: '100%',
          //       height: '100%',
          //     }}
          //   >
          //     <iframe
          //       className="iframe"
          //       title="Template Preview"
          //       loading="lazy"
          //       src={`http://localhost:3000/single-template?t=${JSON.stringify({
          //         _type: 'base.pageBlock',
          //         blockOptions,
          //         components,
          //       })}`}
          //     />
          //   </div>
          // ),
        })}
      </Box>
    </Flex>
  );
}

export function ComponentPreview(props: PreviewProps) {
  const castProps = props as CastPreviewProps;
  const { title, type } = castProps;

  return (
    <Flex align="center">
      <Box flex={1}>
        {props.renderDefault({
          ...props,
          title,
          // media: (
          //   <div
          //     className="iframe-container"
          //     style={{
          //       width: '100%',
          //       height: '100%',
          //     }}
          //   >
          //     <iframe
          //       className="iframe"
          //       title="Template Preview"
          //       loading="lazy"
          //       src={`http://localhost:3000/single-template?t=${JSON.stringify({
          //         _type: type,
          //       })}`}
          //     />
          //   </div>
          // ),
        })}
      </Box>
    </Flex>
  );
}
