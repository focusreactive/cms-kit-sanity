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
      _type == 'tw-base.blockTemplate' => {
          ...,
          image{
            ...,
            'image': asset->{
              'src': url,
              'width': metadata.dimensions.width,
              'height': metadata.dimensions.height,
              'alt': altText,
            }
          }
        },
      _type == 'base.pageBlock' => { // TODO: move it to cms-kit
        ...,
        blockOptions{
          ...,
          layoutOptions{
            ...,
            secondaryComponent[]{
              ...,
              'image': asset->{
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
              'image': asset->{
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
          _type == 'base.grid' => {
            ...,
            items[]{
              ...,
              imageWithMetadata{
                'image': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
              },
            }
          },
          _type == 'base.logoCloudGrid' => {
            ...,
            items[]{
              ...,
              imageWithMetadata{
                'image': asset->{
                  'src': url,
                  'width': metadata.dimensions.width,
                  'height': metadata.dimensions.height,
                  'alt': altText,
                }
              },
            }
          },
          _type == 'base.featurePoints' => {
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
          _type == 'base.blogSection' => {
            ...,
            posts[]{
              ...,
              image{
                'image': asset->{
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
          _type == 'base.styledImage' => {
            ...,
              imageWithMetadata{
                'image': asset->{
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
