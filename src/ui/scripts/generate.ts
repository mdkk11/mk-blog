import 'dotenv/config';
import { getCompleteStyles, getLocalVariables } from '../libs/figma';

async function main() {
    const fileKey = process.env.FIGMA_FILE_KEY;
    if (!fileKey) {
        console.error('FIGMA_FILE_KEY is not set');
        process.exit(1);
    }

    console.log('Fetching styles from Figma...');
    const styles = await getCompleteStyles(fileKey);

    if (styles) {
        console.log(`Found ${styles.length} styles`);
        // console.log(JSON.stringify(styles, null, 2));
    } else {
        console.log('No styles found or error occurred');
    }

    console.log('Fetching variables from Figma...');
    const variables = await getLocalVariables(fileKey);
    if (variables) {
        console.log('Variables fetched successfully');
        // console.log(JSON.stringify(variables, null, 2));
    }
}

main().catch(console.error);
