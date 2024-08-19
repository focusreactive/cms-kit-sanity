import { presets } from '@/components/sa-set';
import RenderPreset from '@/sanity/plugins/blocks-preview/RenderPreset';

type Props = {
  params: { name: string };
};
export default function PresetView({ params }: Props) {
  const { name } = params;

  return <RenderPreset name={name} />;
}

// export function generateStaticParams() {
//   const names = presets.map((p) => ({ name: p.name }));
//   console.log('🚀 ~ generateStaticParams ~ names:', names);
//   return [{ name: 'featureWithImageLeft' }];
// }
