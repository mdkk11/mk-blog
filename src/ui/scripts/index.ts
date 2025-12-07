const _FILE_KEY = process.env.FIGMA_FILE_KEY;
const _SKIP_REST_API = process.argv.includes('--skip-rest-api');

// We write data to disk before processing.
// This allows us to process independent of REST API.
// if (!SKIP_REST_API) {
//   const stylesJSON = await getFileStyles(FILE_KEY!);
//   const stylesGroupByType = groupBy(stylesJSON, ({ type }) => type);

//   for (const [type, styles] of Object.entries(stylesGroupByType)) {
//     const filePath = path.join(import.meta.dirname, `../styles.${type.toLocaleLowerCase()}.json`);
//     await fs.writeFile(filePath, JSON.stringify(styles, null, 2));
//   }
// }
