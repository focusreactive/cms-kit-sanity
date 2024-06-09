---
to: ContentBlocks/<%= h.inflection.camelize(name, false) %>/index.ts
---
/**
 * This is a template content block intended to serve as a sample for creating new blocks. It contains the minimal required structure and functional components.
 *
 * If you wish to quickly add this block to your project, simply navigate through all the files in the root directory of the `blocks` folder and uncomment the relevant imports and insertions.
 * Afterward, you can edit the block as needed. However, a more scalable and recommended approach for adding new components involves the following steps:
 *
 * 1. Copy the <%= h.inflection.camelize(name, false) %> folder to a new folder with the desired component name.
 * 2. Rename the component, schema, and template names from <%= h.inflection.camelize(name, false) %> to your chosen name.
 * 3. Import all elements of your new component in the files within the `blocks` folder, similar to how <%= h.inflection.camelize(name, false) %> is imported.
 * 4. You will then be able to see your component in the Sanity plugin and add it to a page.
 * 5. Edit the component's code and schema, and update the template as necessary.
 * 6. Repeat these steps to create additional components.
 */

export { default as <%= h.inflection.camelize(name, false) %> } from './Component';

/**
 * The Content Block consists of the
 * following main parts:
 *
 * 1. React Component - see the
 * `Component.tsx` file. This is the
 * primary location where the rendering
 * of your component on the page is
 * defined. Edit this file to set the
 * design and behavior of the component.
 * If necessary, feel free to split the
 * component into multiple files. Treat
 * it as a regular React component. The
 * component should be wrapped in a HOC:
 * `export default withCMS({ sa })(<%= h.inflection.camelize(name, false) %>);`,
 * where you need to pass the adapter
 * function to convert CMS content into
 * component props.
 *
 * 2. Adapter Function - see the
 * `sa-adapters.ts` file. Note: If you
 * are developing a component for a
 * project that uses a single CMS as
 * the content source, this function
 * is not mandatory. You can directly
 * pass the content into the component
 * and handle it as needed. However,
 * using such a function is a convenient
 * pattern if you need to perform
 * consistent transformations on the
 * content before passing it to the
 * component.
 *
 * 3. CMS Schema for the Component -
 * see the `sa-schemas.ts` file. This
 * file defines the schema of the
 * component for the CMS. The schema
 * is included in the overall content
 * model of the CMS and specifies which
 * fields will be set in the CMS for
 * this content block. The values of
 * these fields will be passed as props
 * to the component (after being
 * processed by the adapter function).
 *
 * 4. Component Template(s) - see the
 * `sa-templates.ts` file. This file
 * can specify one or more sample
 * content values for this block. All
 * specified samples will be available
 * for selection in the CMS plugin. By
 * setting various sample content
 * variations, you can showcase the
 * block's potential uses to the content
 * editor and simplify their interaction
 * with the CMS.
 */
