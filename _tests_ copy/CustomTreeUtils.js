import { CustomTreeUtil } from '@/utils/CustomTreeUtil';

describe('CustomTreeUtil', () => {
  const mockFlatData = [
    { id: 1, parentId: null, name: 'Root' },
    { id: 2, parentId: 1, name: 'Child 1' },
    { id: 3, parentId: 1, name: 'Child 2' },
    { id: 4, parentId: 2, name: 'Grandchild' },
  ];

  const mockTreeData = [
    {
      id: 1,
      name: 'Root',
      children: [
        {
          id: 2,
          name: 'Child 1',
          children: [
            { id: 4, name: 'Grandchild', children: [] }
          ]
        },
        { id: 3, name: 'Child 2', children: [] }
      ]
    }
  ];

  describe('arrFindTreeKeyLevel', () => {
    test('应返回正确的层级路径（默认分隔符）', () => {
      const result = CustomTreeUtil.arrFindTreeKeyLevel(
        mockFlatData,
        null,
        'parentId',
        4,
        'name'
      );
      expect(result).toBe('Root/Child 1/Grandchild');
    });

    test('应使用自定义分隔符', () => {
      const result = CustomTreeUtil.arrFindTreeKeyLevel(
        mockFlatData,
        null,
        'parentId',
        4,
        'name',
        ' > '
      );
      expect(result).toBe('Root > Child 1 > Grandchild');
    });

    test('应处理根节点直接子节点', () => {
      const result = CustomTreeUtil.arrFindTreeKeyLevel(
        mockFlatData,
        null,
        'parentId',
        2,
        'name'
      );
      expect(result).toBe('Root/Child 1');
    });

    test('应处理无效ID返回空字符串', () => {
      const result = CustomTreeUtil.arrFindTreeKeyLevel(
        mockFlatData,
        null,
        'parentId',
        999,
        'name'
      );
      expect(result).toBe('');
    });
  });

  describe('treeNodeForEach', () => {
    test('应遍历所有节点', () => {
      const mockCallback = jest.fn();
      CustomTreeUtil.treeNodeForEach(mockTreeData, 'children', mockCallback);
      
      expect(mockCallback).toHaveBeenCalledTimes(4);
      expect(mockCallback).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
      expect(mockCallback).toHaveBeenCalledWith(expect.objectContaining({ id: 4 }));
    });

    test('应处理空树', () => {
      const mockCallback = jest.fn();
      CustomTreeUtil.treeNodeForEach([], 'children', mockCallback);
      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('应正确修改节点属性', () => {
      const testTree = JSON.parse(JSON.stringify(mockTreeData));
      CustomTreeUtil.treeNodeForEach(testTree, 'children', node => {
        node.visited = true;
      });

      expect(testTree[0].visited).toBe(true);
      expect(testTree[0].children[0].children[0].visited).toBe(true);
    });

    test('应处理不同的children字段名', () => {
      const customTree = [{
        id: 1,
        name: 'Root',
        nodes: [
          { id: 2, name: 'Child', nodes: [] }
        ]
      }];
      
      const mockCallback = jest.fn();
      CustomTreeUtil.treeNodeForEach(customTree, 'nodes', mockCallback);
      
      expect(mockCallback).toHaveBeenCalledTimes(2);
    });
  });
});
