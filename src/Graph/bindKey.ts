import { Graph } from '@antv/x6'; // 假设这是 x6 的类型定义导入路径  
  
// 画布快捷键的 TypeScript 版本  
export default function bindGraphShortcuts(graph: Graph) {
  // 复制  
  graph.bindKey(['ctrl+c', 'command+c'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {  
      graph.copy(cells);
    }  
    // 判断一个键盘事件是否应该被处理，返回 false 时对应的键盘事件被忽略。  
    return false;  
  });  
  
  // 粘贴  
  graph.bindKey(['ctrl+v', 'command+v'], () => {  
    if (!graph.isClipboardEmpty()) {  
      const cells = graph.paste({  
        offset: 32  
      });  
      graph.cleanSelection();  
      graph.select(cells);  
    }  
    return false;  
  });  
  
  // 全选  
  graph.bindKey(['ctrl+a', 'command+a'], () => {  
    const cells = graph.getCells();  
    if (cells.length) {  
      graph.select(cells);  
    }  
    return false;  
  });  
  
  // 删除  
  graph.bindKey(['delete', 'backspace'], () => {  
    const cells = graph.getSelectedCells();  
    if (cells.length) {  
      // 删除前移除所有包含工具  
      cells.forEach((currentCell) => {  
        // 假设 currentCell 是具有 removeTools 方法的对象  
        (currentCell as any).removeTools(); // 如果 removeTools 不是标准方法，这里需要调整  
      });  
      graph.removeCells(cells);  
    }  
    return false;  
  }, 'keydown'); // 注意：'keydown' 作为第三个参数传递，确保这是 x6 接受的格式  
  
  // 撤销  
  graph.bindKey(['ctrl+z', 'command+z'], () => {  
    if (graph?.history?.undo) {  
      graph.history.undo();  
    }  
    return false;  
  });  
  
  // 重做  
  graph.bindKey(['ctrl+y', 'shift+command+z'], () => {  
    if (graph?.history?.redo) {  
      graph.history.redo();  
    }  
    return false;  
  });  
  
  // Esc 取消所有选中单元 & 关闭提示  
  graph.bindKey('esc', () => {  
    graph.cleanSelection();  
    return false;  
  });  
  
  // 居中  
  graph.bindKey(['alt+f', 'option+f'], () => {  
    graph.centerContent();  
    return false;  
  });  
}