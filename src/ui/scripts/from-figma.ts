// @figma/rest-api-specからOpenAPI仕様を使って型を生成する方法
//
// ステップ1: openapi-typescriptをインストール
// npm install -D openapi-typescript
//
// ステップ2: 型定義を生成
// npx openapi-typescript ./node_modules/@figma/rest-api-spec/openapi/openapi.yaml -o ./src/figma-api.d.ts
//
// ステップ3: 生成された型をインポート

import createClient from 'openapi-fetch';
import type { paths } from '@/ui/libs/open-api/figma-api';

// Figma APIクライアントの作成
const client = createClient<paths>({
  baseUrl: 'https://api.figma.com',
  headers: {
    'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN',
  },
});

// 使用例1: ファイル情報を取得
async function getFile(fileKey: string) {
  const { data, error } = await client.GET('/v1/files/{file_key}', {
    params: {
      path: { file_key: fileKey },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('File name:', data.name);
  console.log('Last modified:', data.lastModified);
  return data;
}

// 使用例2: ファイル内のノード情報を取得
async function getFileNodes(fileKey: string, nodeIds: string[]) {
  const { data, error } = await client.GET('/v1/files/{file_key}/nodes', {
    params: {
      path: { file_key: fileKey },
      query: { ids: nodeIds.join(',') },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Nodes:', data.nodes);
  return data;
}

// 使用例3: 画像をエクスポート
async function getImages(
  fileKey: string,
  nodeIds: string[],
  options?: {
    format?: 'jpg' | 'png' | 'svg' | 'pdf';
    scale?: number;
  }
) {
  const { data, error } = await client.GET('/v1/images/{file_key}', {
    params: {
      path: { file_key: fileKey },
      query: {
        ids: nodeIds.join(','),
        format: options?.format || 'png',
        scale: options?.scale || 1,
      },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Image URLs:', data.images);
  return data;
}

// 使用例4: コメントを取得
async function getComments(fileKey: string) {
  const { data, error } = await client.GET('/v1/files/{file_key}/comments', {
    params: {
      path: { file_key: fileKey },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Comments:', data.comments);
  return data;
}

// 使用例6: Variables取得
async function getLocalVariables(fileKey: string) {
  const { data, error } = await client.GET('/v1/files/{file_key}/variables/local', {
    params: {
      path: { file_key: fileKey },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Variables:', data.meta?.variableCollections);
  return data;
}

// 使用例7: プロジェクトのファイル一覧を取得
async function getProjectFiles(projectId: string) {
  const { data, error } = await client.GET('/v1/projects/{project_id}/files', {
    params: {
      path: { project_id: projectId },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Project files:', data.files);
  return data;
}

// 使用例8: チームのプロジェクト一覧を取得
async function getTeamProjects(teamId: string) {
  const { data, error } = await client.GET('/v1/teams/{team_id}/projects', {
    params: {
      path: { team_id: teamId },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Projects:', data.projects);
  return data;
}

// 使用例9: コンポーネント一覧を取得
async function getTeamComponents(teamId: string) {
  const { data, error } = await client.GET('/v1/teams/{team_id}/components', {
    params: {
      path: { team_id: teamId },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Components:', data.meta?.components);
  return data;
}

// 使用例10: ファイルのスタイル一覧を取得
async function getFileStyles(fileKey: string) {
  const { data, error } = await client.GET('/v1/files/{file_key}/styles', {
    params: {
      path: { file_key: fileKey },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Styles:', data.meta?.styles);
  return data;
}

// 使用例11: スタイルの詳細情報を取得（カラー、テキストスタイルの実際の値）
async function getStyleDetails(fileKey: string, styleNodeIds: string[]) {
  // スタイルのnode_idを使って実際の値を取得
  const { data, error } = await client.GET('/v1/files/{file_key}/nodes', {
    params: {
      path: { file_key: fileKey },
      query: { ids: styleNodeIds.join(',') },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Style details:', data.nodes);
  return data;
}

// 使用例12: チームのスタイル一覧を取得
async function getTeamStyles(teamId: string) {
  const { data, error } = await client.GET('/v1/teams/{team_id}/styles', {
    params: {
      path: { team_id: teamId },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  console.log('Team styles:', data.meta?.styles);
  return data;
}

// 使用例13: スタイル情報を完全に取得（メタデータ + 実際の値）
async function getCompleteStyles(fileKey: string) {
  // ステップ1: スタイルのメタデータを取得
  const stylesData = await getFileStyles(fileKey);
  if (!stylesData?.meta?.styles) return null;

  // ステップ2: 各スタイルのnode_idを抽出
  const styleNodeIds = Object.values(stylesData.meta.styles)
    .map((style: any) => style.node_id)
    .filter(Boolean);

  if (styleNodeIds.length === 0) return stylesData;

  // ステップ3: node_idから実際のスタイル値を取得
  const detailsData = await getStyleDetails(fileKey, styleNodeIds);

  // ステップ4: メタデータと実際の値をマージ
  const completeStyles = Object.entries(stylesData.meta.styles).map(([id, meta]: [string, any]) => {
    const nodeData = detailsData?.nodes?.[meta.node_id];
    return {
      id,
      ...meta,
      values: nodeData?.document, // 実際のfills, textなどの値
    };
  });

  console.log('Complete styles with values:', completeStyles);
  return completeStyles;
}

// 使用例14: ファイル全体の構造と特定のノードの詳細を取得
async function getFileWithNodes(fileKey: string, nodeIds?: string[]) {
  // ステップ1: ファイルの基本情報と全体構造を取得
  const fileData = await getFile(fileKey);
  if (!fileData) return null;

  // nodeIdsが指定されていない場合は、ファイルデータのみ返す
  if (!nodeIds || nodeIds.length === 0) {
    return {
      file: fileData,
      nodes: null,
    };
  }

  // ステップ2: 特定のノードの詳細を取得
  const nodesData = await getFileNodes(fileKey, nodeIds);

  return {
    file: fileData,
    nodes: nodesData?.nodes || null,
  };
}

// 使用例15: ファイルから全てのページとフレームを取得して特定のノードを抽出
async function getFileStructureWithDetails(
  fileKey: string,
  options?: {
    depth?: number;
    geometry?: 'paths' | 'bounds';
  }
) {
  // ステップ1: ファイル全体を取得
  const { data, error } = await client.GET('/v1/files/{file_key}', {
    params: {
      path: { file_key: fileKey },
      query: {
        depth: options?.depth || 2,
        geometry: options?.geometry,
      },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  // ステップ2: ドキュメント構造からnode_idを収集
  const collectNodeIds = (node: any, ids: string[] = []): string[] => {
    if (node.id) ids.push(node.id);
    if (node.children) {
      node.children.forEach((child: any) => collectNodeIds(child, ids));
    }
    return ids;
  };

  const allNodeIds = collectNodeIds(data.document);

  // ステップ3: 大量のノードがある場合は制限をかける
  const limitedNodeIds = allNodeIds.slice(0, 100); // 最大100ノード

  // ステップ4: 各ノードの詳細を取得
  const nodesData = await getFileNodes(fileKey, limitedNodeIds);

  return {
    file: data,
    nodes: nodesData?.nodes || null,
    totalNodes: allNodeIds.length,
    fetchedNodes: limitedNodeIds.length,
  };
}

// 使用例16: 特定の条件に一致するノードを検索して詳細を取得
async function findAndGetNodes(fileKey: string, predicate: (node: any) => boolean) {
  // ステップ1: ファイル全体を取得
  const fileData = await getFile(fileKey);
  if (!fileData) return null;

  // ステップ2: 条件に一致するノードを検索
  const matchingNodeIds: string[] = [];
  const searchNodes = (node: any) => {
    if (predicate(node)) {
      matchingNodeIds.push(node.id);
    }
    if (node.children) {
      node.children.forEach(searchNodes);
    }
  };

  searchNodes(fileData.document);

  if (matchingNodeIds.length === 0) {
    return {
      file: fileData,
      matchingNodes: [],
    };
  }

  // ステップ3: 一致したノードの詳細を取得
  const nodesData = await getFileNodes(fileKey, matchingNodeIds);

  return {
    file: fileData,
    matchingNodes: matchingNodeIds.map((id) => ({
      id,
      data: nodesData?.nodes?.[id],
    })),
  };
}

// 使用例17: レイヤー構造を階層的に取得
async function getLayerHierarchy(fileKey: string, depth: number = 10) {
  const { data, error } = await client.GET('/v1/files/{file_key}', {
    params: {
      path: { file_key: fileKey },
      query: {
        depth: depth, // 階層の深さを指定（デフォルトは10）
      },
    },
  });

  if (error) {
    console.error('Error:', error);
    return null;
  }

  // レイヤー構造を整形
  const formatLayer = (node: any, level: number = 0): any => {
    const indent = '  '.repeat(level);
    console.log(`${indent}${node.type}: ${node.name} (id: ${node.id})`);

    return {
      id: node.id,
      name: node.name,
      type: node.type,
      visible: node.visible,
      locked: node.locked,
      children: node.children?.map((child: any) => formatLayer(child, level + 1)),
    };
  };

  console.log('\n=== レイヤー構造 ===');
  const hierarchy = {
    name: data.name,
    pages: data.document.children?.map((page: any) => formatLayer(page, 0)),
  };

  return hierarchy;
}

// 使用例18: 特定のページ配下のレイヤーを取得
async function getPageLayers(fileKey: string, pageName: string) {
  const fileData = await getFile(fileKey);
  if (!fileData) return null;

  // ページを検索
  const page = fileData.document.children?.find((child: any) => child.name === pageName);

  if (!page) {
    console.error(`Page "${pageName}" not found`);
    return null;
  }

  // ページ配下の全レイヤーを収集
  const layers: any[] = [];
  const collectLayers = (node: any, parentPath: string = '') => {
    const path = parentPath ? `${parentPath} > ${node.name}` : node.name;
    layers.push({
      id: node.id,
      name: node.name,
      type: node.type,
      path: path,
      visible: node.visible,
      locked: node.locked,
    });

    if (node.children) {
      node.children.forEach((child: any) => collectLayers(child, path));
    }
  };

  collectLayers(page);

  console.log(`\n=== "${pageName}" ページのレイヤー (${layers.length}個) ===`);
  layers.forEach((layer) => {
    console.log(`- ${layer.path} (${layer.type})`);
  });

  return layers;
}

// 使用例19: 特定のフレーム配下の全レイヤーを取得
async function getFrameLayers(fileKey: string, frameName: string) {
  const fileData = await getFile(fileKey);
  if (!fileData) return null;

  // フレームを検索
  let targetFrame: any = null;
  const searchFrame = (node: any): boolean => {
    if (node.type === 'FRAME' && node.name === frameName) {
      targetFrame = node;
      return true;
    }
    if (node.children) {
      return node.children.some((child: any) => searchFrame(child));
    }
    return false;
  };

  searchFrame(fileData.document);

  if (!targetFrame) {
    console.error(`Frame "${frameName}" not found`);
    return null;
  }

  // フレーム配下のレイヤーを階層的に取得
  const getLayersRecursive = (node: any, level: number = 0): any => {
    return {
      id: node.id,
      name: node.name,
      type: node.type,
      level: level,
      absoluteBoundingBox: node.absoluteBoundingBox,
      children: node.children?.map((child: any) => getLayersRecursive(child, level + 1)),
    };
  };

  const frameLayers = getLayersRecursive(targetFrame);

  console.log(`\n=== "${frameName}" フレームのレイヤー ===`);
  console.log(JSON.stringify(frameLayers, null, 2));

  return frameLayers;
}

// 使用例20: 全ページとフレームの一覧を取得
async function getAllPagesAndFrames(fileKey: string) {
  const fileData = await getFile(fileKey);
  if (!fileData) return null;

  const structure: any = {
    fileName: fileData.name,
    pages: [],
  };

  fileData.document.children?.forEach((page: any) => {
    const pageInfo: any = {
      id: page.id,
      name: page.name,
      frames: [],
    };

    // ページ直下のフレームを収集
    page.children?.forEach((child: any) => {
      if (child.type === 'FRAME') {
        pageInfo.frames.push({
          id: child.id,
          name: child.name,
          type: child.type,
          childCount: child.children?.length || 0,
        });
      }
    });

    structure.pages.push(pageInfo);
  });

  console.log('\n=== ファイル構造 ===');
  console.log(`ファイル名: ${structure.fileName}`);
  structure.pages.forEach((page: any) => {
    console.log(`\nページ: ${page.name} (${page.frames.length} フレーム)`);
    page.frames.forEach((frame: any) => {
      console.log(`  - ${frame.name} (${frame.childCount} 子要素)`);
    });
  });

  return structure;
}

// エラーハンドリングのヘルパー関数
function handleApiError(error: any) {
  if (error.status === 401) {
    console.error('認証エラー: アクセストークンを確認してください');
  } else if (error.status === 403) {
    console.error('権限エラー: このリソースへのアクセス権限がありません');
  } else if (error.status === 404) {
    console.error('リソースが見つかりません');
  } else if (error.status === 429) {
    console.error('レート制限に達しました');
  } else if (error.status === 500) {
    console.error('サーバーエラーが発生しました');
  } else {
    console.error('APIエラー:', error);
  }
}

// 実行例
async function _main() {
  const fileKey = 'YOUR_FILE_KEY';

  // ファイル情報を取得
  const _file = await getFile(fileKey);

  // 画像をエクスポート
  await getImages(fileKey, ['node-id-1', 'node-id-2'], {
    format: 'png',
    scale: 2,
  });

  // Variablesを取得
  await getLocalVariables(fileKey);
}

// エクスポート
export { client, getFile, getFileNodes, getImages, getComments, getLocalVariables, getProjectFiles, getTeamProjects, getTeamComponents, getFileStyles, getStyleDetails, getTeamStyles, getCompleteStyles, getFileWithNodes, getFileStructureWithDetails, findAndGetNodes, getLayerHierarchy, getPageLayers, getFrameLayers, getAllPagesAndFrames, handleApiError };
