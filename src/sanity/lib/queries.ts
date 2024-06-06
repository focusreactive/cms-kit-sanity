import { groq } from 'next-sanity';

export const pagesBySlugQuery = groq`
    * [_type == 'landing' && slug.current == $slug] {
      title,
      description,
      badgeText,
      content[]{
      ...,
      _type == 'fb-test.landingBlock' => {
          ...,
          teamMembers[]->{
            ...,
            'avatar': image.asset->
          }
        },
      _type == 'tw-tw-base.blockTemplate' => {
          ...,
          image{
            ...,
            'imageAsset': asset->{
              'src': url,
              'width': metadata.dimensions.width,
              'height': metadata.dimensions.height,
              'alt': altText,
            }
          }
        },
      _type == 'tw-base.pageBlock' => { // TODO: move it to cms-kit
        ...,
        blockOptions{
          ...,
          layoutOptions{
            ...,
            secondaryComponent[]{
              'ver': '2.0',
              _type,
              'imageAsset': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
            }
          },
          backgroundOptions{
            ...,
            imageSelector{
              ...,
              'imageAsset': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
            }
          }
        },
        components[]{
          ...,
          _type == 'tw-base.grid' => {
            ...,
            items[]{
              ...,
              imageWithMetadata{
                'imageAsset': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
              },
            }
          },
          _type == 'tw-base.logoCloudGrid' => {
            ...,
            items[]{
              ...,
              imageWithMetadata{
                'imageAsset': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
              },
            }
          },
          _type == 'tw-base.featurePoints' => {
            ...,
            features[]{
              ...,
              icon{
                'icon': icon.asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
              },
            }
          },
          _type == 'tw-base.blogSection' => {
            ...,
            posts[]{
              ...,
              image{
                'imageAsset': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
              },
              authors[]{
               ...,
              avatar{
                'image': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
              },
              }
            }
          },
          _type == 'tw-base.styledImage' => {
            ...,
              imageWithMetadata{
                'imageAsset': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                },
            }
          }
        }
      }
    }}[0]
  `;
