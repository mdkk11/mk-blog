import createClient from 'openapi-fetch';
import type { paths } from '@/ui/libs/open-api/figma-api';

// Figma API Client
export const client = createClient<paths>({
    baseUrl: 'https://api.figma.com',
    headers: {
        'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN || '',
    },
});

// Helper functions

export async function getFile(fileKey: string) {
    const { data, error } = await client.GET('/v1/files/{file_key}', {
        params: {
            path: { file_key: fileKey },
        },
    });

    if (error) {
        console.error('Error fetching file:', error);
        return null;
    }
    return data;
}

export async function getFileNodes(fileKey: string, nodeIds: string[]) {
    const { data, error } = await client.GET('/v1/files/{file_key}/nodes', {
        params: {
            path: { file_key: fileKey },
            query: { ids: nodeIds.join(',') },
        },
    });

    if (error) {
        console.error('Error fetching nodes:', error);
        return null;
    }
    return data;
}

export async function getFileStyles(fileKey: string) {
    const { data, error } = await client.GET('/v1/files/{file_key}/styles', {
        params: {
            path: { file_key: fileKey },
        },
    });

    if (error) {
        console.error('Error fetching styles:', error);
        return null;
    }
    return data;
}

export async function getStyleDetails(fileKey: string, styleNodeIds: string[]) {
    const { data, error } = await client.GET('/v1/files/{file_key}/nodes', {
        params: {
            path: { file_key: fileKey },
            query: { ids: styleNodeIds.join(',') },
        },
    });

    if (error) {
        console.error('Error fetching style details:', error);
        return null;
    }
    return data;
}

export async function getLocalVariables(fileKey: string) {
    const { data, error } = await client.GET('/v1/files/{file_key}/variables/local', {
        params: {
            path: { file_key: fileKey },
        },
    });

    if (error) {
        console.error('Error fetching variables:', error);
        return null;
    }
    return data;
}

export async function getCompleteStyles(fileKey: string) {
    const stylesData = await getFileStyles(fileKey);
    if (!stylesData?.meta?.styles) return null;

    const styleNodeIds = Object.values(stylesData.meta.styles)
        .map((style: any) => style.node_id)
        .filter(Boolean);

    if (styleNodeIds.length === 0) return [];

    // Fetch details in chunks if needed, but for now fetch all
    const detailsData = await getStyleDetails(fileKey, styleNodeIds);

    const completeStyles = Object.entries(stylesData.meta.styles).map(([id, meta]: [string, any]) => {
        const nodeData = detailsData?.nodes?.[meta.node_id];
        return {
            id,
            ...meta,
            values: nodeData?.document,
        };
    });

    return completeStyles;
}
